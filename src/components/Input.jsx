import React, { useContext, useState } from 'react'
import Attach from '../images/attachment.png'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';

const Input = () => {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    const [msg, setMsg] = useState("");
    const [image, setImage] = useState();

    const handleSend = async () => {
        if (msg === "")
            return;
        try {
            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({
                    id: uuid(),
                    text: msg,
                    sender: currentUser.uid,
                    date: Timestamp.now(),
                })
            });
        } catch (error) {
            console.log(error);
        }
        setMsg("");
    }
    return (
        <div className='input'>
            <input type='text'
                placeholder='Say something...'
                value={msg}
                onChange={(e) => { setMsg(e.target.value) }} />
            <div className='actions'>
                <input type='file' id='file' style={{ display: 'none' }} />
                <label htmlFor='file'>
                    <img src={Attach} alt='attach file' />
                </label>
                <button onClick={() => { handleSend() }}>Send</button>
            </div>
        </div>
    )
}

export default Input