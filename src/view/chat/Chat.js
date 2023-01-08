import React, { useState } from "react";
import ChatSection from "./ChatSection";
import Sidebar from "./Sidebar";

const Chat = () => {
  const [room, setRoom] = useState({
    roomId: 1,
    name: "Room 1",
    status: "Online",
    image: "https://bootdey.com/img/Content/avatar/avatar2.png",
  });
  return (
    <div class="container p-0">
      <div class="card">
        <div class="row g-0">
          <Sidebar room={room} setRoom={setRoom} />
          <ChatSection room={room}/>
        </div>
      </div>
    </div>
  );
};

export default Chat;
