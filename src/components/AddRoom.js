import React, { useState } from 'react';
import db from "../firebase"

const AddRoom = () => {
    const [topic, setTopic] = useState("")

    const addRoom = () => {
        topic && db.collection("rooms").add({
            name: topic
        })
    }

    return (
        <div className="new-room">
            <label>Create Room</label>
            <input type="text" onChange={e => setTopic(e.target.value)} />
            <button onClick={addRoom}>+ create</button>
        </div>

    )
}

export default AddRoom
