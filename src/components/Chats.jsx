import React from 'react'

const Chats = () => {
    return (
        <div className='userChat'>
            <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile picture' />
            <div className="details">
                <p className='name'>John</p>
                <p className='last-message'>last message</p>
            </div>
        </div>
    )
}

export default Chats