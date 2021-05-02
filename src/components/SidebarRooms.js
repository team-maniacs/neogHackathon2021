import React from "react";
import { useNavigate } from "react-router";
import { useRooms } from "../room-context";

const SidebarRooms = () => {
  const { filteredRooms } = useRooms();
  const navigate = useNavigate();

  const selectRoom = (id) => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(`title`);
    }
  };

  return (
    <div>
      <div className='current-rooms'>
        {filteredRooms.map((room) => (
          <div key={room.id}>
            {room.name}
            <button onClick={() => selectRoom(room.id)}>Enter Room</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarRooms;
