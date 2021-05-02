import React from "react";
import { useNavigate } from "react-router";
import db from '../firebase'

import { useAuth } from "../context/user-context";


const SidebarRooms = ({ rooms }) => {

    const navigate = useNavigate();
    const { user } = useAuth()

    const selectRoom = (id) => {
        if (id) {
            db.collection("rooms").doc(id).collection("requests").add({
                name: user.displayName,
                image: user.photoURL,
                isWriter: user.isWriter,
                requested: false
            })
            navigate(`/room/${id}`)
        } else {
            navigate(`title`)
        }
    }

    return (
        <div>
            <div className="current-rooms">
                {rooms.map((room) =>
                    <div key={room.id}>
                        {room.name}
                        <button onClick={() => selectRoom(room.id)}>Enter Room</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SidebarRooms
