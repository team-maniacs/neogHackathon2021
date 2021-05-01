import React, { useEffect, useState } from 'react';
import db from "../firebase"

import "../styles/sidebar.css"
import AddRoom from './AddRoom';

import SidebarRooms from "./SidebarRooms"

const Sidebar = () => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        db.collection('rooms').onSnapshot(snap => (
            setRooms(snap.docs.map((doc) => (
                {
                    id: doc.id,
                    name: doc.data().name
                }
            )))
        ))
    }, [])

    return (
        <div className="sidebar">
            <AddRoom />
            <SidebarRooms rooms={rooms} />
        </div>
    )
}

export default Sidebar
