import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from '../firebase';
import TailSpinner from './TailSpinner';

const Search = () => {
    const { currentUser } = useContext(AuthContext);
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

    const handleSelect = async () => {
        const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            //get userchat 
            const res = await getDoc(doc(db, "chats", combinedID));
            if (!res.exists()) {
                //create userchat if it does not exist
                const chatRef = doc(db, "chats", combinedID);
                await setDoc(chatRef, { messages: [] });
            }

            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedID + ".chatInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                },
                [combinedID + ".date"]: serverTimestamp()
            });

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedID + ".chatInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [combinedID + ".date"]: serverTimestamp()
            })
        } catch (error) {
            console.log(error);
        }

        setSearchTerm("");
        setUser(null);
    }
    return (
        <div className='search'>
            <div className='searchForm'>
                <input type='text'
                    placeholder='Find a user'
                    onKeyDown={handleKey}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    value={searchTerm} />
                {loading && <div className='spinHolder'>
                    <TailSpinner />
                </div>}
            </div>
            {user ?
                <div className='userChat' onClick={handleSelect}>
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