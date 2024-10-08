import React, { useState } from 'react'
import Avatar from '../images/gallery.png';
import { auth, storage, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileLabel, setFileLabel] = useState('Add avatar')
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if (file) {

                const storageRef = ref(storage, `${username}_${file.name}`);

                const uploadTask = uploadBytesResumable(storageRef, file);

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
                            await updateProfile(res.user, {
                                displayName: username,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName: username,
                                email,
                                photoURL: downloadURL,
                            });

                            await setDoc(doc(db, "userChats", res.user.uid), {});
                            navigate("/");
                        });
                    }
                );
            } else {
                await updateProfile(res.user, {
                    displayName: username,
                    photoURL: null,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: username,
                    email,
                    photoURL: null,
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
            }
        } catch (error) {
            setErr(true);
            setLoading(false);
        }
    }

    const fileSelected = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            setFileLabel(e.target.files[0].name)
        } else {
            setFileLabel('Add avatar');
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat App</span>
                <span className='title'>Register</span>
                <form onSubmit={submitForm}>
                    <input type='name' placeholder='Username' />
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    <input type='file' onChange={fileSelected} id="file" style={{ display: 'none' }} />
                    <label htmlFor='file' className='file-picker'>
                        <img src={Avatar} alt='pick profile image' />
                        <span>{fileLabel}</span>
                    </label>
                    {loading ?
                        <Spinner />
                        : <button>Sign up</button>
                    }
                </form>
                {err && <p style={{ color: 'red' }}>Something went wrong.</p>}
                <p>You already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register