import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import TailSpinner from './TailSpinner';

const Search = () => {
    const currentUser = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", searchTerm));

        try {
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot);
            setErr(true);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                setErr(false);
            });
            setLoading(false);
        } catch (error) {
            setErr(true);
            setLoading(false);
            console.log("somewthing went wrong");
        }
    }
    const handleKey = (e) => {
        setUser(null);
        setErr(false);

        if (e.code === "Enter") {
            handleSearch();
            setLoading(true);
        }
    }
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={(e) => { setSearchTerm(e.target.value) }} />
                {loading && <div className='spinHolder'>
                    <TailSpinner />
                </div>}
            </div>
            {user ?
                <div className='userChat'>
                    <img src={user.photoURL} alt='profile picture' />
                    <div className="details">
                        <p className='name'>{user.displayName}</p>
                    </div>
                </div>
                : err ? <p className='error'>User not found</p>
                    : <></>}
        </div>
    )
}

export default Search