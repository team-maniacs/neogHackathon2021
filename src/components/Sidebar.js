import React from "react";

import "../styles/sidebar.css";
// import AddRoom from "./AddRoom";
import Header from "./Header";

import SidebarRooms from "./SidebarRooms";

const Sidebar = () => (
  <div className="app-content">
    <Header page={"Rooms"} />
    <div className="sidebar">
      {/* <AddRoom /> */}
      <SidebarRooms />
    </div>
  </div>
);

export default Sidebar;
