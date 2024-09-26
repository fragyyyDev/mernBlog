import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../app/firebase';
import { useDispatch } from 'react-redux';
import { SignInSuccess } from '../app/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const auth = getAuth(app); // Initialize the auth object
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            // Use signInWithPopup with the initialized auth object
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: result.user.displayName, // Ensure 'username' is sent
                    email: result.user.email,
                    photoURL: result.user.photoURL, // Use the correct property for photo URL
                }),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(SignInSuccess(data));
                navigate('/'); // Redirect after successful login
            } else {
                console.error('Authentication error:', data);
            }
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        }
    };

    return (
        <Button type='button' className='bg-cyan-800' onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google  
        </Button>
    );
}
