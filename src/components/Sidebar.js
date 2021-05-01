import "../styles/sidebar.css"
import db from "../firebase"

import React, { useEffect, useState } from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';

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
            {rooms.map((room) =>
                <div>
                    {room.name}
                </div>
            )}
        </div>
    )
}

export default Sidebar
