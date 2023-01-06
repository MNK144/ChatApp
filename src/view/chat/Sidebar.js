import React from "react";

const Sidebar = () => {
  const data = [
    {
      name: "Vanessa Tucker",
      status: "Online",
      unread: "5",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      name: "William Harris",
      status: "Online",
      unread: "2",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      name: "Sharon Lessman",
      status: "Online",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      name: "Christina Mason",
      status: "Offline",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      name: "Fiona Green",
      status: "Offline",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      name: "Doris Wilder",
      status: "Offline",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      name: "Haley Kennedy",
      status: "Offline",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      name: "Jennifer Chang",
      status: "Offline",
      unread: "0",
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
  ];

  return (
    <div class="col-12 col-lg-5 col-xl-3 border-right">
      <div class="px-4 d-none d-md-block">
        <div class="d-flex align-items-center">
          <div class="flex-grow-1">
            <input
              type="text"
              class="form-control my-3"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {data.map((people) => (
        <div class="list-group-item list-group-item-action border-0 sidebar-people noselect">
          {people.unread > 0 ? (
            <div class="badge bg-success float-right badge-custom">{people.unread}</div>
          ) : null}
          <div class="d-flex align-items-start">
            <img
              src={people.image}
              class="rounded-circle mr-1"
              alt={people.name}
              width="40"
              height="40"
            />
            <div class="flex-grow-1 ml-3">
              {people.name}
              <div class="small">
                <span class="fas fa-circle chat-online"></span> {people.status}
              </div>
            </div>
          </div>
        </div>
      ))}

      <hr class="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
};

export default Sidebar;
