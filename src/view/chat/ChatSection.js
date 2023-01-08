import React, { useEffect, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import API from "../../API";

const ChatSection = ({room}) => {
  //   const currentPerson = "Sharon Lessman";
  const currentPerson = room.name;
  const currentStatus = room.status;
  const roomImage = room.image;
  const myavatar = "https://bootdey.com/img/Content/avatar/avatar1.png";

  const [connect, setConnect] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [message, setMessage] = useState("");
  const [liveChatData, setLiveChatData] = useState([]);
  const [chatVisible,setChatVisible] = useState(true);
  const [connectedRoom,setConnectedRoom] = useState(-1);

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
    console.log("lastMessage", lastMessage);
    console.log("readyState", readyState);
    console.log("connectionStatus", connectionStatus);
  }, [lastMessage, readyState]);

  useEffect(() => {
    const state = {
      type: "System",
      content: "",
    };
    if (readyState === 0) {
      state.content = "Connecting to Room 1...";
      setLiveChatData([...liveChatData, state]);
      setIsActive(false);
      setIsConnecting(true);
    }
    if (readyState === 1) {
      state.content = "Connected to Room 1";
      setLiveChatData([...liveChatData, state]);
      setIsActive(true);
      setIsConnecting(false);
      setConnectedRoom(room.roomId);
    }
    if (readyState === 3) {
      state.content = "Disconnected from Room 1";
      setLiveChatData([...liveChatData, state]);
      setIsActive(false);
      setIsConnecting(false);
      setConnectedRoom(-1);
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
      const msg = lastMessage.data;
      console.log("Received Message:", msg);
      const newMessage = {
        sender: "Stranger",
        receiver: "You",
        content: msg,
        time: "0:00 am",
        outgoing: false,
      };
      setLiveChatData([...liveChatData, newMessage]);
    }
  }, [lastMessage]);

  useEffect(()=>{
    if(room.roomId === connectedRoom) {
        setChatVisible(true);
        setIsActive(true);
    } else {
        setChatVisible(false);
        setIsActive(false);
    }
  },[room]);

  const handleConnect = () => {
    if(!connect)
        setConnect(true);
    else {
        setConnect(false);
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
      sender: "You",
      receiver: "Stranger",
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
    <div class="col-12 col-lg-7 col-xl-9">
      <div class="py-2 px-4 border-bottom d-none d-lg-block">
        <div class="d-flex align-items-center py-1">
          <div class="position-relative">
            <img
              src={roomImage}
              class="rounded-circle mr-1"
              alt={currentPerson}
              width="40"
              height="40"
            />
          </div>
          <div class="flex-grow-1 pl-3">
            <strong>{currentPerson}</strong>
            <div class="text-muted small">{currentStatus}</div>
          </div>
          <div>
            <button
              class="btn btn-primary border px-3"
              disabled={isConnecting}
              onClick={handleConnect}
            >
              {isActive ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>

      <div class="position-relative">
        <div class="chat-messages p-4">
          {liveChatData.map((message) => {
            //test
            if (message.type) {
              return <p>{message.content}</p>;
            }
            return (
              <div
                class={`chat-message-${
                  message.outgoing ? "right" : "left"
                } pb-4`}
              >
                <div>
                  <img
                    src={message.outgoing ? myavatar : roomImage}
                    class="rounded-circle mr-1"
                    alt={message.sender}
                    width="40"
                    height="40"
                  />
                  <div class="text-muted small text-nowrap mt-2">
                    {message.time}
                  </div>
                </div>
                <div
                  class={`flex-shrink-1 bg-light rounded py-2 px-3 m${
                    message.outgoing ? "r" : "l"
                  }-3`}
                >
                  <div class="font-weight-bold mb-1">
                    {message.outgoing ? "You" : message.sender}
                  </div>
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div class="flex-grow-0 py-3 px-4 border-top">
        <form onSubmit={handleSend}>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button class="btn btn-primary" disabled={!isActive}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
