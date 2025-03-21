import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

// import axios from 'axios';
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      console.log('state captured', currentUser);
      if (currentUser) {
        // get token and store client side
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo).then(res => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        });
      } else {
        // Todo: remove token (if token stored in the client side : local storage , caching , in memory)
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  //   const unsubscribe = onAuthStateChanged(auth, async currentUser => {
  //     console.log('Current User:', currentUser?.email);

  //     // if (currentUser?.email) {
  //     //   setUser(currentUser);

  //     //   // Get JWT token
  //     //   try {
  //     //     await axios.post(
  //     //       `${import.meta.env.VITE_API_URL}/jwt`,
  //     //       { email: currentUser?.email },
  //     //       { withCredentials: true }
  //     //     );
  //     //   } catch (error) {
  //     //     console.error('JWT Token Error:', error);
  //     //   }
  //     // } else {
  //     //   setUser(null);
  //     //   try {
  //     //     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
  //     //       withCredentials: true,
  //     //     });
  //     //   } catch (error) {
  //     //     console.error('Logout Error:', error);
  //     //   }
  //     // }
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
