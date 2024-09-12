import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
    const { data } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });

            return () => {
                unsub();
            }
        }
        data.chatID && getMessages();
    }, [data.chatID]);

    return (
        <div className='messages'>
            {messages.map((element) => {
                console.log("element", element);
                return <Message message={element} key={element.id} />
            })}
        </div>
    )
}

export default Messages