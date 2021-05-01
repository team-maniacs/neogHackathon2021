import React from "react";
import { useNavigate } from "react-router";


const SidebarRooms = ({ rooms }) => {

    const navigate = useNavigate()

    const selectRoom = (id) => {
        if (id) {
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
