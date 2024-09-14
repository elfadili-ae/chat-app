import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { useState } from 'react'
import HIDEICON from '../images/leftarrows.png'
import SHOWICON from '../images/rightarrows.png'

const Sidebar = () => {
    const [hideSidebar, setHideSetbar] = useState(false);

    const toggleBtn = () => {
        setHideSetbar(!hideSidebar);
    }
    return (
        <div className={`sidebar ${hideSidebar ? "hide" : ""}`}
            onClick={() => { toggleBtn() }}>
            <div className='hideBtn'>
                <img src={hideSidebar ? SHOWICON : HIDEICON} alt='' />
            </div>
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar