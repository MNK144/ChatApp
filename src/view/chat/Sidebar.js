import React from "react";

const Sidebar = ({ room, setRoom }) => {
  //   const data = [
  //     {
  //       name: "Vanessa Tucker",
  //       status: "Online",
  //       unread: "5",
  //       image: "https://bootdey.com/img/Content/avatar/avatar5.png",
  //     },
  //     {
  //       name: "William Harris",
  //       status: "Online",
  //       unread: "2",
  //       image: "https://bootdey.com/img/Content/avatar/avatar2.png",
  //     },
  //     {
  //       name: "Sharon Lessman",
  //       status: "Online",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar3.png",
  //     },
  //     {
  //       name: "Christina Mason",
  //       status: "Offline",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar4.png",
  //     },
  //     {
  //       name: "Fiona Green",
  //       status: "Offline",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar5.png",
  //     },
  //     {
  //       name: "Doris Wilder",
  //       status: "Offline",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar2.png",
  //     },
  //     {
  //       name: "Haley Kennedy",
  //       status: "Offline",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar4.png",
  //     },
  //     {
  //       name: "Jennifer Chang",
  //       status: "Offline",
  //       unread: "0",
  //       image: "https://bootdey.com/img/Content/avatar/avatar4.png",
  //     },
  //   ];
  const roomData = [
    {
      roomId: "1",
      name: "Room 1",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      roomId: "2",
      name: "Room 2",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      roomId: "3",
      name: "Room 3",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      roomId: "4",
      name: "Room 4",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      roomId: "5",
      name: "Room 5",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      roomId: "6",
      name: "Room 6",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      roomId: "7",
      name: "Room 7",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
  ];

  const handleRoomChange = (rm) => {
    console.log(rm);
    if(rm.roomId === room.roomId) {
        console.log("Same Room");
    } else {
        console.log("Different Room");
        setRoom(rm);
    }
  };

  return (
    <div className="col-12 col-lg-5 col-xl-3 border-right">
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {roomData.map((people, index) => (
        <div
          key={index}
          onClick={handleRoomChange.bind(null, people)}
          className="list-group-item list-group-item-action border-0 sidebar-people noselect"
        >
          {people.unread > 0 ? (
            <div className="badge bg-success float-right badge-custom">
              {people.unread}
            </div>
          ) : null}
          <div className="d-flex align-items-start">
            <img
              src={people.image}
              className="rounded-circle mr-1"
              alt={people.name}
              width="40"
              height="40"
            />
            <div className="flex-grow-1 ml-3">
              {people.name}
              <div className="small">
                <span className="fas fa-circle chat-online"></span> {people.status}
              </div>
            </div>
          </div>
        </div>
      ))}

      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
};

export default Sidebar;
