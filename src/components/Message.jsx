import React from 'react'

const Message = ({ isOwner = false }) => {
    return (
        <div className={`message ${isOwner ? 'owner' : ''}`}>
            <div className="messageInfo">
                <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile picture' />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>how are you?
                </p>

            </div>
        </div>
    )
}

export default Message