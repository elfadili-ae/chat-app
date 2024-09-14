import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago';
import DefaultAvatar from '../images/defaultpic.png';

TimeAgo.addDefaultLocale(en)

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    return (
        <div className={`message ${message.sender === currentUser.uid ? 'owner' : ''}`}>
            <div className="messageInfo">
                <img src={message.sender === currentUser.uid ?
                    (currentUser.photoURL ? currentUser.photoURL : DefaultAvatar)
                    : data.user.photoURL ? data.user.photoURL : DefaultAvatar}
                    alt='profile picture' />
                <span><ReactTimeAgo date={new Date(message.date.seconds * 1000 + Math.round(message.date.nanoseconds / 1000000))} timeStyle="twitter" locale="en-US" /></span>
            </div>
            <div className="messageContent">
                {message.text && <p>{message.text}</p>}
                {message?.photoURL && <img src={message.photoURL} alt='message photo' />}
            </div>
        </div>
    )
}

export default Message