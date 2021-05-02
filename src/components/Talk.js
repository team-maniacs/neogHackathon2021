import React, { useEffect, useState } from 'react';
import "../styles/talk.css";
import { useParams } from "react-router-dom";
import db from '../firebase';
import Message from './Message';
import TextInput from './TextInput';
import { useAuth } from '../context/user-context';


const Talk = () => {

    const { roomId } = useParams();
    const [roomInfo, setRoomInfo] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])
    const [roomMembers, setRoomMembers] = useState([])
    const [requests, setRequests] = useState([])
    const { dispatch } = useAuth()



    useEffect(() => {

        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snap) => (
                setRoomInfo(snap.data())
            ))

        };

        db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snap) => setRoomMessages(snap.docs.map((doc) => doc.data())))

        db.collection("rooms")
            .doc(roomId)
            .collection("requests")
            .onSnapshot((snap) => setRoomMembers(snap.docs.map((doc) => doc.data())))

        db.collection("rooms")
            .doc(roomId)
            .collection("requests")
            .onSnapshot((snap) => setRequests(snap.docs.map((doc) => doc.data().requested)))


    }, [roomId])

    const request = (member) => {
        dispatch({ type: "SET_WRITER", payload: { member } })
    }

    console.log(requests)

    return (
        <div className="chat" style={{ border: "2px solid black" }}>
            <div className="chat-header">
                <h1>Topic: {roomInfo?.name}</h1>
            </div>
            <div style={{ border: "2px solid black" }}>
                {
                    roomMembers.map((member) => <div>
                        <p>{member.name}</p>
                        {member.requested ? <button>Requested</button> : <button onClick={() => request(member)}>Raise</button>}
                    </div>
                    )
                }
            </div>
            <div style={{ display: "flex" }}>
                <div className="message-section">
                    {roomMessages.map(({ message, user, timestamp, userImage }) => (
                        <Message
                            key={timestamp}
                            message={message}
                            user={user}
                            timestamp={timestamp}
                            userImage={userImage}
                        />
                    ))}
                </div>
                <TextInput room={roomInfo?.name} id={roomId} />

            </div>

        </div>
    )
}

export default Talk;
