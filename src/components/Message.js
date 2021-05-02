import React from 'react';
import "../styles/message.css"

const Message = ({ message, timestamp, user, userImage }) => {
    return (
        <div className="message">
            <img src={userImage} alt="" style={{ height: "50px", width: "50px" }} />
            <div className="message-info">
                <h4>{message}</h4>
                <p>{user} {new Date(timestamp?.toDate()).toUTCString()}</p>
            </div>
        </div>
    )
}

export default Message;
