import React from 'react'
import Message from './Message'

const Messages = () => {
    return (
        <div className='messages'>
            <Message />
            <Message isOwner={true} />
            <Message />
            <Message isOwner={true} />
            <Message />
            <Message isOwner={true} />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}

export default Messages