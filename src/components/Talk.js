import React from 'react';
import "../styles/chat.css";
import { useParams } from "react-router-dom";

const Talk = () => {

    const { roomId } = useParams();

    return (
        <div className="chat">
            <h1>my room {roomId}</h1>
            <div className="chat-header">

            </div>
        </div>
    )
}

export default Talk;
