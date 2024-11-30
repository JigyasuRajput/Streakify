import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

interface AuthProps {
  onSignIn: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSignIn }) => {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;
    
    setIsSigningIn(true);
    try {
      const provider = new GoogleAuthProvider();
      // Add select_account to force account picker
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      await signInWithPopup(auth, provider);
      onSignIn();
      toast.success('Successfully signed in!');
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      if (error.code === 'auth/popup-blocked') {
        toast.error('Please allow popups for this site to sign in with Google');
      } else {
        toast.error('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">Welcome to Streakify</h1>
      <button
        onClick={handleGoogleSignIn}
        disabled={isSigningIn}
        className={`flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg transition-colors ${
          isSigningIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <LogIn className="w-5 h-5" />
        {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
      </button>
      <p className="mt-4 text-sm text-gray-400 text-center">
        Please ensure popups are enabled for this extension
      </p>
    </div>
  );
};

export default Auth;