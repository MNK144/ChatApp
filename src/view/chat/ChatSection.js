import React, { useEffect, useRef, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import API from "../../API";

const ChatSection = ({ room }) => {
  //   const currentPerson = "Sharon Lessman";
  const currentPerson = room.name;
  const currentStatus = room.status;
  const roomImage = room.image;
  const myavatar = "https://bootdey.com/img/Content/avatar/avatar1.png";

  const [connect, setConnect] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [liveChatData, setLiveChatData] = useState([]);

  const [connectedRoom, setConnectedRoom] = useState("-1");
  const [roomPreview, setRoomPreview] = useState(false);

  const [connectedStatus, setConnectedStatus] = useState({});
  const bottomRef = useRef();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    API.url,
    undefined,
    connect
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    console.log("room change called,", room);
    if (isActive) {
      if (room.roomId === connectedRoom) {
        setRoomPreview(false);
        setUsername(connectedStatus.username);
      } else {
        setRoomPreview(true);
      }
    }
  }, [room, connectedRoom]);

  useEffect(() => {
    setMessage("");
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [liveChatData]);

  useEffect(() => {
    console.log("lastMessage", lastMessage);
    console.log("readyState", readyState);
    console.log("connectionStatus", connectionStatus);
  }, [lastMessage, readyState]);

  //Handling different socket states
  useEffect(() => {
    const state = {
      type: "System",
      content: "",
    };
    if (readyState === 0) {
      state.content = "Establishing Connection...";
      setLiveChatData([...liveChatData, state]);
      setIsActive(false);
      setIsConnecting(true);
    }
    if (readyState === 1) {
      setIsActive(true);
      setIsConnecting(false);
      handleChangeRoom(room.roomId);
    }
    if (readyState === 3) {
      state.content = "Disconnected from Room";
      setLiveChatData([...liveChatData, state]);
      setIsActive(false);
      setIsConnecting(false);
      setConnectedRoom("-1");
      setConnect(false);
      setConnectedStatus({ ...connectedStatus, connected: false });
    }
  }, [readyState]);

  //   useEffect(()=>{
  //     if(isFirst && readyState === 1) {
  //         const obj = {
  //             action: "send",
  //             data: {
  //                 sender: "Manank",
  //                 receiver: "Jeet",
  //                 time: "12:55 am",
  //                 content: "Yoo what up bro",
  //             },
  //           };
  //         if(readyState === 1) {
  //             sendMessage(JSON.stringify(obj));
  //         }
  //         setFirst(false);
  //     }
  //   },[isFirst,readyState])

  //for receiving messages
  useEffect(() => {
    if (lastMessage) {
      let newMessage;
      const message = JSON.parse(lastMessage.data);
      if (!message) {
        newMessage = { type: "System", content: "Unknown Error" };
      } else if (message.type === "SYS") {
        if (message.action === "RC") {
          if (message.status === "Success") {
            newMessage = {
              type: "System",
              content: `Connected to Room ${connectedRoom}`,
            };
          } else {
            newMessage = {
              type: "System",
              content: `Failed to connect to Room`,
            };
          }
        }
      } else if (message.username) {
        newMessage = {
          sender: message.username,
          content: message.message,
          time: "0:00 am",
          outgoing: false,
        };
      }
      console.log("Received Message:", message);
      setLiveChatData([...liveChatData, newMessage]);
    }
  }, [lastMessage]);

  const handleChangeRoom = (rid) => {
    const state = {
      type: "System",
      content: `Connecting to Room ${rid}...`,
    };
    setLiveChatData([state]);
    const params = {
      roomId: rid,
      username: username,
    };
    sendMessage(JSON.stringify({ action: "changeroom", data: params }));
    setConnectedStatus({ ...params, connected: true });
    setConnectedRoom(rid);
  };

  const handleConnect = (isConnect) => {
    console.log("isConnect", isConnect);
    console.log("roomPreview", roomPreview);
    if (roomPreview) {
      //make room switch happen
      setLiveChatData([]);
      setRoomPreview(false);
      handleChangeRoom(room.roomId);
    } else {
      if (isConnect) setConnect(true);
      else setConnect(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    console.log("Sending Message:", message);
    const obj = {
      action: "send",
      data: {
        message: message,
      },
    };
    sendMessage(JSON.stringify(obj));
    setMessage("");

    const newMessage = {
      sender: username,
      content: message,
      time: "0:00 am",
      outgoing: true,
    };
    setLiveChatData([...liveChatData, newMessage]);
  };

  //   const chatData = [
  //     {
  //       sender: "You",
  //       receiver: "Sharon Lessman",
  //       content:
  //         "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
  //       time: "2:33 am",
  //       outgoing: true,
  //     },
  //     {
  //       sender: "Sharon Lessman",
  //       receiver: "You",
  //       content:
  //         "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
  //       time: "2:34 am",
  //       outgoing: false,
  //     },
  //     {
  //       sender: "You",
  //       receiver: "Sharon Lessman",
  //       content: "Cum ea graeci tractatos.",
  //       time: "2:35 am",
  //       outgoing: true,
  //     },
  //     {
  //       sender: "Sharon Lessman",
  //       receiver: "You",
  //       content:
  //         "Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.",
  //       time: "2:36 am",
  //       outgoing: false,
  //     },
  //     {
  //       sender: "Sharon Lessman",
  //       receiver: "You",
  //       content:
  //         "Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.",
  //       time: "2:37 am",
  //       outgoing: false,
  //     },
  //   ];

  return (
    <div className="col-12 col-lg-7 col-xl-9">
      <div className="py-2 px-4 border-bottom d-none d-lg-block">
        <div className="d-flex align-items-center py-1">
          <div className="position-relative">
            <img
              src={roomImage}
              className="rounded-circle mr-1"
              alt={currentPerson}
              width="40"
              height="40"
            />
          </div>
          <div className="flex-grow-1 pl-3">
            <strong>{currentPerson}</strong>
            <div className="text-muted small">{currentStatus}</div>
          </div>
          <div style={{ marginRight: "7px" }}>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Enter username"
              disabled={roomPreview ? false : isActive}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              className="btn btn-primary border px-3"
              disabled={isConnecting}
              onClick={handleConnect.bind(null, roomPreview || !isActive)}
            >
              {roomPreview || !isActive ? "Connect" : "Disconnect"}
            </button>
          </div>
        </div>
      </div>

      <div className="position-relative">
        <div className="chat-messages p-4">
          {!roomPreview
            ? liveChatData.map((message, index) => {
                //test
                if (message.type) {
                  return <p key={index}>{message.content}</p>;
                }
                return (
                  <div
                    key={index}
                    className={`chat-message-${
                      message.outgoing ? "right" : "left"
                    } pb-4`}
                  >
                    <div>
                      <img
                        src={message.outgoing ? myavatar : roomImage}
                        className="rounded-circle mr-1"
                        alt={message.sender}
                        width="40"
                        height="40"
                      />
                      <div className="text-muted small text-nowrap mt-2">
                        {message.time}
                      </div>
                    </div>
                    <div
                      className={`flex-shrink-1 bg-light rounded py-2 px-3 m${
                        message.outgoing ? "r" : "l"
                      }-3`}
                    >
                      <div className="font-weight-bold mb-1">
                        {message.outgoing ? "You" : message.sender}
                      </div>
                      {message.content}
                    </div>
                  </div>
                );
              })
            : "Enter Username and Connect to join this room"}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex-grow-0 py-3 px-4 border-top">
        <form onSubmit={handleSend}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={roomPreview ? true : isActive ? false : true}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
