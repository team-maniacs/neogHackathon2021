import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/user-context'
import db from '../firebase'
import firebase from "../firebase"
import '../styles/textinput.css'

const TextInput = ({ room, id }) => {

    const { roomId } = useRef()
    const [input, setInput] = useState("");
    const { user } = useAuth()

    const inputRef = useRef()


    const sendMessage = (e) => {
        e.preventDefault();
        if (id) {
            db.collection("rooms").doc(id).collection("messages").add({
                message: input,
                timestamp: firebase.Xc.firebase_.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL
            })
            setInput("")
        }
    }



    useEffect(() => {
        try {
            inputRef.current.focus();
        } catch (error) {
            console.log(error)
        }
    }, [roomId])

    return (
        <div ref={inputRef}>
            {user.isWriter ?
                <form onSubmit={sendMessage}>
                    <input
                        value={input}
                        placeholder={`Send in ${room}`}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>send</button>
                </form>
                :
                <button>Raise</button>
            }


        </div>
    )
}

export default TextInput
