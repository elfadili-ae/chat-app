import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <h2 className='logo'>Chat App</h2>
            <div className='user'>
                <img src={currentUser.photoURL} alt='profile picture' />
                <p>{currentUser.displayName}</p>
                <button onClick={() => { signOut(auth); navigate("/login") }}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar