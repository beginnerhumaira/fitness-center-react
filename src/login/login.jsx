import React, { useState } from 'react';
import './Login.css'; // Updated styles with login- prefixes
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxtu5zdVRa6gCUAN7uPeqi3VeX9msVAbE",
  authDomain: "crud-51f2d.firebaseapp.com",
  projectId: "crud-51f2d",
  storageBucket: "crud-51f2d.appspot.com",
  messagingSenderId: "171046847828",
  appId: "1:171046847828:web:84e1dda098c53a6c96f4c1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Auth = () => {
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', name: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const togglePanel = () => {
    setIsRegisterActive(!isRegisterActive);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password, name } = registerForm;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name,
        role: 'user'
      });
      alert("User registered successfully!");
      togglePanel(); // Switch back to login form
    } catch (error) {
      alert(error.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        window.location.href = "/"; // Change to your dashboard route
      } else {
        alert("User data not found.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className={`login-container ${isRegisterActive ? 'login-right-panel-active' : ''}`} id="login-container">
        {/* Register Form */}
        <div className="login-form-container login-register-container">
          <form onSubmit={registerUser} className="login-form">
            <h1 className="login-title">Register here.</h1>
            <input className="login-form-input" type="text" name="name" placeholder="Name" value={registerForm.name} onChange={handleRegisterChange} required />
            <input className="login-form-input" type="email" name="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterChange} required />
            <input className="login-form-input" type="password" name="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterChange} required />
            <button type="submit" className="login-button">Register</button>
            <span className="login-span">or use your social accounts</span>
            <div className="login-social-container">
              <a href="#" className="login-link"><i className="lni lni-facebook-fill"></i></a>
              <a href="#" className="login-link"><i className="lni lni-google"></i></a>
              <a href="#" className="login-link"><i className="lni lni-twitter-original"></i></a>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="login-form-container login-login-container">
          <form onSubmit={loginUser} className="login-form">
            <h1 className="login-title">Login here.</h1>
            <input className="login-form-input" type="email" name="email" placeholder="Email" value={loginForm.email} onChange={handleLoginChange} required />
            <input className="login-form-input" type="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleLoginChange} required />
            <div className="login-content">
              <div className="login-checkbox-wrapper">
                <input type="checkbox" id="login-checkbox" className="login-checkbox" />
                <label htmlFor="login-checkbox" className="login-checkbox-label">Remember me</label>
              </div>
              <div className="login-pass-link">
                <a href="#" className="login-link">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="login-button">Login</button>
            <span className="login-span">or use your social accounts</span>
            <div className="login-social-container">
              <a href="#" className="login-link"><i className="lni lni-facebook-fill"></i></a>
              <a href="#" className="login-link"><i className="lni lni-google"></i></a>
              <a href="#" className="login-link"><i className="lni lni-twitter-original"></i></a>
            </div>
          </form>
        </div>

        {/* Overlay */}
        <div className="login-overlay-container">
          <div className="login-overlay">
            <div className="login-overlay-panel login-overlay-panel-left">
              <h1 className="login-title">Hello <br /> Fitness Lovers!</h1>
              <p className="login-p">If you have an account, login here and Calculate Your Calorie Burn!</p>
              <button className="login-button ghost" onClick={togglePanel}>Login
                <i className="lni lni-arrow-left login"></i>
              </button>
              <a href="/admin-login" className="login-link">
                <button className="login-button">Login As Admin</button>
              </a>
            </div>
            <div className="login-overlay-panel login-overlay-panel-right">
              <h1 className="login-title">Begin your <br /> Fitness Journey now</h1>
              <p className="login-p">If you don't have an account yet, join us and Become the Best of Who You Are!</p>
              <button className="login-button ghost" onClick={togglePanel}>Register
                <i className="lni lni-arrow-right register"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
