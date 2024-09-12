import React, { useContext, useState } from 'react'
import Gallery from '../images/gallery.png'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    const [msg, setMsg] = useState("");
    const [image, setImage] = useState();

    const handleSend = async () => {
        if (msg === "" && image === null)
            return;
        try {
            if (image) {

                const storageRef = ref(storage, `${currentUser.displayName}_${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    'state_changed', // Specify the event type
                    (snapshot) => {
                        // You can monitor the progress of the upload here if needed
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.error("Error during upload:", error.message);
                        setErr(true);
                    },
                    () => {
                        // Handle successful uploads on complete
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateDoc(doc(db, "chats", data.chatID), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text: msg,
                                    photoURL: downloadURL,
                                    sender: currentUser.uid,
                                    date: Timestamp.now(),
                                })
                            });
                        });
                    }
                );
            } else {
                await updateDoc(doc(db, "chats", data.chatID), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: msg,
                        sender: currentUser.uid,
                        date: Timestamp.now(),
                    })
                });
            }
        } catch (error) {
            console.log(error);
        }
        setMsg("");
        setImage(null);
    }

    const fileSelected = (e) => {
        console.log("file selected");
        e.preventDefault();
        if (e.target.files.length > 0) {
            console.log("change picture", e.target.files[0]);
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    }
    return (
        <div className='input'>
            {data.chatID !== "" ? <>
                <input type='text'
                    placeholder='Say something...'
                    value={msg}
                    onChange={(e) => { setMsg(e.target.value) }} />
                <div className='actions'>
                    <input type='file' id='file' style={{ display: 'none' }} onChange={fileSelected} />
                    <label htmlFor='file'>
                        <img src={image ? URL.createObjectURL(image) : Gallery} alt='attach file' />
                    </label>
                    <button onClick={() => { handleSend() }}>Send</button>
                </div>
            </>
                : <p>Select a chat and have fun!</p>
            }
        </div>
    )
}

export default Input