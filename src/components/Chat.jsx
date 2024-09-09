import React from 'react'
import CAM from '../images/cam.png';
import ADD from '../images/add-user.png';
import DOTS from '../images/dots.png';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>John</span>
                <div className="chatIcons">
                    <img src={CAM} alt='video call' />
                    <img src={ADD} alt='add user' />
                    <img src={DOTS} alt='settings' />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat