import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar'>
            <h2 className='logo'>Chat App</h2>
            <div className='user'>
                <img src='https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile picture' />
                <p>John</p>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Navbar