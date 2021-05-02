import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import { useRooms } from "../room-context";
const Header = ({ page }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();

  const { roomDispatch } = useRooms();
  const findRoomOrMessage = (e) => {
    page === "Rooms"
      ? roomDispatch({ type: "SEARCH_ROOM_TEXT", value: e.target.value })
      : roomDispatch({ type: "SEARCH_CHAT_TEXT", value: e.target.value });
  };
  return (
    <header className='header'>
      <FontAwesomeIcon icon={faBars} />
      Chaupal
      <div className='search-bar'>
        <input
          type='search'
          placeholder='Search for Rooms'
          className='search-box'
          onChange={(e) => findRoomOrMessage(e)}
        />
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
      </div>
      <div className='user'>
        <span onClick={() => setShowUserMenu((prevValue) => !prevValue)}>
          <img src={user?.photoURL} alt='userimage' className='avatar' />
        </span>
        <div class={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}>
          <div>{user?.displayName}</div>
          <div>Profile</div>
          <div>Security</div>
          <div>Logout</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
