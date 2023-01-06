import React from 'react';
import ChatSection from './ChatSection';
import Sidebar from './Sidebar';

const Chat = () => {
  return (
    <div class="container p-0">
    <div class="card">
      <div class="row g-0">
        <Sidebar/>
        <ChatSection/>
      </div>
    </div>
  </div>
  );
}

export default Chat;