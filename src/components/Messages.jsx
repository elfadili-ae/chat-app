import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
    const { data } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const msgEnd = useRef();

    const scrollToBottom = (behave = "smooth") => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView({ behavior: behave });
        }
    }

    useEffect(() => {
        const getMessages = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
                scrollToBottom();
            });

            return () => {
                unsub();
            }
        }
        data.chatID && getMessages();
    }, [data.chatID]);

    useEffect(() => {
        scrollToBottom("auto");
    }, [messages])

    return (
        <div className='messages'>
            {messages.map((element) => {
                return <Message message={element} key={element.id} />
            })}
            <div ref={msgEnd} style={{ height: "20px" }}></div>
        </div>
    )
}

export default Messages