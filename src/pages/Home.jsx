import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Register from './Register'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className='home'>
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home