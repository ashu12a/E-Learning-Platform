import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Loader from './Loader';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';

const LoginForm = ({ open, handleClose, handleGoogleLogin }) => {
    const [loading, setloading] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        setloading(true);
        // Handle login logic here
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {loading && <Loader />}
            <Toaster/>
            <DialogTitle className="text-center">Login to <span className='font-bold text-[crimson]'>E</span>LMS</DialogTitle>
            <DialogContent>

                <form onSubmit={handleSubmit}>
                    <TextField label="Username" fullWidth margin="normal" />
                    <TextField label="Password" fullWidth margin="normal" type="password" />
                    <DialogActions className="justify-center">
                        <Button onClick={handleClose} color="primary" variant="outlined">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <div className='text-center mb-6 px-6'>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            toast.error('Login Failed, Try Again');
                        }}
                    />
                </GoogleOAuthProvider>
            </div>
            <div className='mb-4'>
                <p className='text-center'>Want to create an account, <span className="text-blue-500 cursor-pointer">SignUp</span></p>
            </div>
        </Dialog>
    );
};

export default LoginForm;
