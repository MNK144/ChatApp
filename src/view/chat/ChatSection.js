import React from "react";

const ChatSection = () => {
  const currentPerson = "Sharon Lessman";
  const myavatar = "https://bootdey.com/img/Content/avatar/avatar1.png";
  const theiravatar = "https://bootdey.com/img/Content/avatar/avatar3.png";
  const chatData = [
    {
      sender: "You",
      receiver: "Sharon Lessman",
      content:
        "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
      time: "2:33 am",
      outgoing: true,
    },
    {
      sender: "Sharon Lessman",
      receiver: "You",
      content:
        "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
      time: "2:34 am",
      outgoing: false,
    },
    {
      sender: "You",
      receiver: "Sharon Lessman",
      content: "Cum ea graeci tractatos.",
      time: "2:35 am",
      outgoing: true,
    },
    {
      sender: "Sharon Lessman",
      receiver: "You",
      content:
        "Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit. Proin ultricies placerat imperdiet. Morbi varius quam ac venenatis tempus.",
      time: "2:36 am",
      outgoing: false,
    },
    {
      sender: "Sharon Lessman",
      receiver: "You",
      content:
        "Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.",
      time: "2:37 am",
      outgoing: false,
    },
  ];

  return (
    <div class="col-12 col-lg-7 col-xl-9">
      <div class="py-2 px-4 border-bottom d-none d-lg-block">
        <div class="d-flex align-items-center py-1">
          <div class="position-relative">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              class="rounded-circle mr-1"
              alt={currentPerson}
              width="40"
              height="40"
            />
          </div>
          <div class="flex-grow-1 pl-3">
            <strong>{currentPerson}</strong>
            <div class="text-muted small">
              <em>Typing...</em>
            </div>
          </div>
          <div>
            <button class="btn btn-primary border px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-more-horizontal feather-lg"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="position-relative">
        <div class="chat-messages p-4">
          {chatData.map((message) => (
            <div
              class={`chat-message-${message.outgoing ? "right" : "left"} pb-4`}
            >
              <div>
                <img
                  src={message.outgoing ? myavatar : theiravatar}
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
          ))}
        </div>
      </div>

      <div class="flex-grow-0 py-3 px-4 border-top">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Type your message"
          />
          <button class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
