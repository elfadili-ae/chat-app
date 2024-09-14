import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import NewMessage from '../audio/newMessage.mp3';
import MyMessage from '../audio/mymessage.wav';
import { AuthContext } from '../context/AuthContext';

const Messages = () => {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const isInitialLoad = useRef(true);
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
                if (!isInitialLoad.current) {
                    if (doc.exists() && doc.data().messages[doc.data().messages.length - 1]?.sender !== currentUser.uid) {
                        document.getElementById("new-message").play();
                    }
                    if (doc.exists() && doc.data().messages[doc.data().messages.length - 1]?.sender === currentUser.uid) {
                        document.getElementById("my-message").play();
                    }
                } else {
                    isInitialLoad.current = false;
                }
            });

            return () => {
                unsub();
            }
        }
        data.chatID && getMessages();

        return () => {
            isInitialLoad.current = true;
        }
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
            <audio id='new-message' src={NewMessage} />
            <audio id='my-message' src={MyMessage} />
        </div>
    )
}

export default Messages