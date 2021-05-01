import "../styles/header.css"

import React from 'react'
import { useAuth } from "../context/user-context"

const Header = () => {

    const { user } = useAuth()

    return (
        <div className="header">
            <img src={user?.photoURL} style={{ height: "50px", width: "50px" }} alt="" />
            <h4>{user?.displayName}</h4>
        </div>
    )
}

export default Header
