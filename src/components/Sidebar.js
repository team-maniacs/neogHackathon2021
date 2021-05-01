import React from "react";

import "../styles/sidebar.css";
import AddRoom from "./AddRoom";

import SidebarRooms from "./SidebarRooms";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <AddRoom />
      <SidebarRooms />
    </div>
  );
};

export default Sidebar;
