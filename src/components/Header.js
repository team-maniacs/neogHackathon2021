import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faThumbtack,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useAuth } from "../context/user-context";
import { useRooms } from "../room-context";
import { useNavigate } from "react-router";
const Header = ({ page }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { roomDispatch } = useRooms();
  const findRoomOrMessage = (e) => {
    page === "Rooms"
      ? roomDispatch({ type: "SEARCH_ROOM_TEXT", value: e.target.value })
      : roomDispatch({ type: "SEARCH_CHAT_TEXT", value: e.target.value });
  };
  return (
    <header className='header'>
      <FontAwesomeIcon
        className='home-icon'
        icon={faHome}
        onClick={() => navigate("/user")}
      />
      <h1 className='brandName'>Chaupal</h1>
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
