import React, { useEffect, useState } from 'react';
import "../styles/talk.css";
import { useParams } from "react-router-dom";
import db from '../firebase';
import Message from './Message';
import TextInput from './TextInput';

const Talk = () => {

    const { roomId } = useParams();
    const [roomInfo, setRoomInfo] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])

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

    }, [roomId])
    console.log(roomInfo)
    console.log(roomMessages)

    return (
        <div className="chat" style={{ border: "2px solid black" }}>
            <div className="chat-header">
                <h1>Topic: {roomInfo?.name}</h1>
            </div>
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
    )
}

export default Talk;
