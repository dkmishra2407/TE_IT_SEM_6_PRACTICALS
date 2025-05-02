import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/signin');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div 
            className='container d-flex flex-column justify-content-center align-items-center' 
            style={{ minHeight: "100vh" }}
        >
            <h1>Welcome To API's</h1>
            <div className='d-flex justify-content-center align-items-center gap-3'>
                <button className='btn btn-success' onClick={handleLogin}>Log In</button>
                <button className='btn btn-secondary' onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
    );
};

export default Home;
