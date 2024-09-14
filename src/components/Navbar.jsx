import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import DefaultAvatar from '../images/defaultpic.png'
import logo from '../images/chatlogo.png'

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    return (
        <div className='navbar'>
            {/* <h2 className='logo'>Chat App</h2> */}
            <img className='logo' src={logo} alt='chat app logo' />
            <div className='user'>
                <img src={currentUser.photoURL ? currentUser.photoURL : DefaultAvatar} alt='profile picture' />
                <p>{currentUser.displayName}</p>
                <button onClick={() => { signOut(auth); navigate("/login") }}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar