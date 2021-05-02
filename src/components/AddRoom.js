import React, { useState } from 'react';
import { useAuth } from '../context/user-context';
import db from "../firebase"

const AddRoom = () => {
    const [topic, setTopic] = useState("")
    const { user, dispatch } = useAuth();


    const addRoom = () => {
        topic && db.collection("rooms").add({
            name: topic
        })


        dispatch({ type: "SET_HOST", payload: user })

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
