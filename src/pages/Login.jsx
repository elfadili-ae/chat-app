import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from '../components/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setErr(true);
            setLoading(false);
        }
    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>Chat App</span>
                <span className='title'>Login</span>
                <form onSubmit={submitForm}>
                    <input type='email' placeholder='email' />
                    <input type='password' placeholder='password' />
                    {
                        loading ?
                            <Spinner />
                            : <button>Sign in</button>
                    }
                </form>
                {err && <p>Something went wrong, try again!</p>}
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login