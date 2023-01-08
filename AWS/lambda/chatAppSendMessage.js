const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `${domain}/${stage}`;
  const callbackAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: callbackUrl,
  });
  console.log(event);

  const payload = JSON.parse(event.body).data;

  if (event.requestContext.routeKey === "changeroom") {
    //handle room switching action
    let roomId = payload.roomId;
    let username = payload.username;
    let params = {
      TableName: process.env.table,
      Key: {
        connectionId: connectionId,
      },
      UpdateExpression: "set roomId = :r, username = :u",
      ExpressionAttributeValues: {
        ":r": roomId,
        ":u": username,
      },
    };
    try {
      let upd = await ddb.update(params).promise();
      console.log(upd);
    } catch (err) {
      console.log(err);
    }
    try {
      await callbackAPI
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({
            type: "SYS",
            action: "RC",
            status: "Success",
          }),
        })
        .promise();
    } catch (err) {
      console.log(err);
      await callbackAPI
        .postToConnection({
          ConnectionId: connectionId,
          Data: JSON.stringify({ type: "SYS", action: "RC", status: "Failed" }),
        })
        .promise();
    }
  } else if (event.requestContext.routeKey === "send") {
    let connections;
    let current;
    try {
      current = await ddb
        .get({
          TableName: process.env.table,
          Key: {
            connectionId: connectionId,
          },
        })
        .promise();
      console.log(current);
      console.log(current.Item);
      console.log(current.Item.roomId);
      // connections = await ddb.scan({TableName: process.env.table}).promise();
      const params = {
        TableName: process.env.table,
        IndexName: "roomId-index",
        KeyConditionExpression: "roomId = :rid",
        ExpressionAttributeValues: { ":rid": current.Item.roomId },
      };
      connections = await ddb.query(params).promise();
      console.log(connections);
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
      };
    }
    const message = payload.message;
    const sendMessages = connections.Items.map(
      async ({ username, connectionId }) => {
        if (connectionId !== event.requestContext.connectionId) {
          try {
            await callbackAPI
              .postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify({
                  message: message,
                  username: current.Item.username,
                }),
              })
              .promise();
          } catch (err) {
            console.log(err);
          }
        }
      }
    );
    try {
      await Promise.all(sendMessages);
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
      };
    }
  } else {
    await callbackAPI
      .postToConnection({
        ConnectionId: connectionId,
        Data: "Use the send route to send message",
      })
      .promise();
  }

  return {
    statusCode: 200,
  };
};
