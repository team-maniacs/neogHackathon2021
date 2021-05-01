import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <header className='header'>
      <FontAwesomeIcon icon={faBars} />
      Chaupal
      <div className='search-bar'>
        <input
          type='search'
          placeholder='Search for Rooms'
          className='search-box'
        />
        <FontAwesomeIcon icon={faSearch} className='search-icon' />
      </div>
      <div className='user'>
        <span
          className='avatar'
          onClick={() => setShowUserMenu((prevValue) => !prevValue)}>
          AB
        </span>
        <div class={`user-menu ${showUserMenu ? "show-user-menu" : ""}`}>
          <div>Profile</div>
          <div>Security</div>
          <div>Logout</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
