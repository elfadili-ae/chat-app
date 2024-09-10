import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { CHANGE_USER } from '../context/chatActions';

const Chats = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);

    const handleSelect = (u) => {
        dispatch({ type: CHANGE_USER, payload: u });
    }

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    return (
        Object.entries(chats)?.map((element) => {
            return (<div className='userChat' key={element[0]} onClick={() => { handleSelect(element[1].chatInfo) }}>
                <img src={element[1].chatInfo.photoURL} alt='profile picture' />
                <div className="details">
                    <p className='name'>{element[1].chatInfo.displayName}</p>
                    <p className='last-message'>{element[1].chatInfo?.lastMessage}</p>
                </div>
            </div>)
        })
    )
}

export default Chats