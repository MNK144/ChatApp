
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrl = `${domain}/${stage}`;
  const callbackAPI = new AWS.ApiGatewayManagementApi({ apiVersion: '2018-11-29',endpoint: callbackUrl });
  console.log(event)
  
  let connections;
  try {
    connections = await ddb.scan({TableName: process.env.table}).promise();
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
    }
  }
  
  if(event.requestContext.routeKey === "$default") {
    await callbackAPI.postToConnection({ConnectionId: connectionId, Data: "Use the send route to send message"}).promise();
    return {
      statusCode: 200,
    };
  }
  
  const message = JSON.parse(event.body).data.message;
  const sendMessages = connections.Items.map(async ({connectionId})=>{
    if(connectionId !== event.requestContext.connectionId) {
      try {
        await callbackAPI.postToConnection({ConnectionId: connectionId, Data: message}).promise();
      } catch (err) {
        console.log(err);
      }
    }
  })

  try {
    await Promise.all(sendMessages);
  } catch(e) {
    console.log(e);
    return {
      statusCode: 500,
    }
  }
  
  // const requestParams = {
  //   ConnectionId: connectionId,
  //   Data: event.body,
  // };
  // const command = new PostToConnectionCommand(requestParams);
  // try {
  //   await callbackAPI.send(command);
  // } catch (error) {
  //   console.log(error);
  // }  
    
  return {
    statusCode: 200,
  };
};
