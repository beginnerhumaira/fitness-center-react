import React, { useState } from 'react';
import './admin.css'; // Updated styles with admin- prefixes
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const [registerForm, setRegisterForm] = useState({ email: '', password: '', name: '' });
    const [adminForm, setAdminForm] = useState({ email: '', password: '' });

    const handleRegisterChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleAdminChange = (e) => {
        setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
    };

    const resetForms = () => {
        setRegisterForm({ email: '', password: '', name: '' });
        setAdminForm({ email: '', password: '' });
    };
    const togglePanel = () => {
        setIsRegisterActive(!isRegisterActive);
        resetForms();

        
    };

    // Function to handle admin login
    async function loginAdmin(event) {
        event.preventDefault(); // Prevent form submission

        const { email, password } = adminForm;

        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Retrieve user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.email));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.role === "admin") {
                    navigate('/dashboard');
                } else {
                    alert("You do not have admin access.");
                }
            } else {
                alert("User data not found in Firestore.");
            }

            // Reset the admin form after successful login
            setAdminForm({ email: '', password: '' });
        } catch (error) {
            console.error("Error during admin login:", error.message);
            alert(error.message);
        }
    }

    return (
        <div className="admin-wrapper">
            <div className={`admin-container ${isRegisterActive ? 'admin-right-panel-active' : ''}`} id="admin-container">
                <div className="admin-form-container admin-register-container">
                    <div className="admin-form">
                        <h1>Admin Controls.</h1>
                        <button className='admin-button' onClick={togglePanel} id="user-register">Welcome Admin</button>
                    </div>
                </div>

                {/* Admin Form */}
                <div className="admin-form-container admin-admin-container">
                    <form onSubmit={loginAdmin} className="admin-form">
                        <h1 className="admin-title">Login here.</h1>
                        <input
                            className="admin-form-input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={adminForm.email}
                            onChange={handleAdminChange}
                            required
                        />
                        <input
                            className="admin-form-input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={adminForm.password}
                            onChange={handleAdminChange}
                            required
                        />
                        <div className="admin-content">
                            <div className="admin-checkbox-wrapper">
                                <input type="checkbox" id="admin-checkbox" className="admin-checkbox" />
                                <label htmlFor="admin-checkbox" className="admin-checkbox-label">Remember me</label>
                            </div>
                            <div className="admin-pass-link">
                                <a href="#" className="admin-link">Forgot password?</a>
                            </div>
                        </div>
                        <button type="submit" className="admin-button">Login</button>
                        <span className="admin-span">or use your social accounts</span>
                        <div className="admin-social-container">
                            <a href="#" className="admin-link"><i className="lni lni-facebook-fill"></i></a>
                            <a href="#" className="admin-link"><i className="lni lni-google"></i></a>
                            <a href="#" className="admin-link"><i className="lni lni-twitter-original"></i></a>
                        </div>
                    </form>
                </div>

                {/* Overlay */}
                <div className="admin-overlay-container">
                    <div className="admin-overlay">
                        <div className="admin-overlay-panel admin-overlay-panel-left">
                            <h1 className="admin-title">Hello <br />
                                Trainers!</h1>
                            <p className="admin-p">Login to your account and Manage your Valuable members</p>
                            <button className="admin-button ghost" onClick={togglePanel}>
                                Login
                                <i className="lni lni-arrow-left admin"></i>
                            </button>
                        </div>
                        <div className="admin-overlay-panel admin-overlay-panel-right">
                            <h1 className="admin-title">Thank you <br /> For helping people in their Fitness Journey</h1>
                            <button className="admin-button ghost" onClick={togglePanel}>Start
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
