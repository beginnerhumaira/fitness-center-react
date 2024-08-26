import React, { useState, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import emailjs from 'emailjs-com';

// Firebase Configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAxtu5zdVRa6gCUAN7uPeqi3VeX9msVAbE',
    authDomain: 'crud-51f2d.firebaseapp.com',
    projectId: 'crud-51f2d',
    storageBucket: 'crud-51f2d.appspot.com',
    messagingSenderId: '171046847828',
    appId: '1:171046847828:web:84e1dda098c53a6c96f4c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const Dashboard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        startdate: '',
        enddate: '',
    });
    const [data, setData] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');

    useEffect(() => {
        // Check if the user is logged in and has the admin role
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user)
                const userDoc = await getDoc(doc(db, 'users', user.email));
                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    fetchData(); // Fetch data if the user is an admin
                } else {
                    navigate('/'); // Redirect to /auth if the user is not an admin
                }
            } else {
                navigate('/auth'); // Redirect to /auth if no user is logged in
            }
        });
    }, [navigate]);

    // Fetching data from Firestore
    const fetchData = async () => {
        const snapshot = await getDocs(collection(db, 'CRUD'));
        const fetchedData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setData(fetchedData);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Adding data to Firestore
    const addData = async () => {
        const { name, email, phone, startdate, enddate } = formData;

        if (!name || !email || !phone || !startdate || !enddate) {
            alert('Please fill in all fields');
            return;
        }

        if (startdate > enddate) {
            alert('Start date cannot be greater than end date');
            return;
        }

        try {
            await addDoc(collection(db, 'CRUD'), {
                Name: name,
                Email: email,
                Phone: phone,
                Startdate: startdate,
                Enddate: enddate,
            });
            alert('Data Added Successfully');
            fetchData(); // Refresh data after adding
            clearForm();
        } catch (error) {
            alert('Failed to Add Data');
        }
    };

    // Populating the form for updating
    const populateForm = async (id) => {
        const docRef = doc(db, 'CRUD', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
                name: data.Name,
                email: data.Email,
                phone: data.Phone,
                startdate: data.Startdate,
                enddate: data.Enddate,
            });
            setCurrentId(id);
        }
    };

    // Updating data in Firestore
    const updateData = async () => {
        const { name, email, phone, startdate, enddate } = formData;

        if (!name || !email || !phone || !startdate || !enddate) {
            alert('Please fill in all fields');
            return;
        }

        if (startdate > enddate) {
            alert('Start date cannot be greater than end date');
            return;
        }

        try {
            const docRef = doc(db, 'CRUD', currentId);
            await updateDoc(docRef, {
                Name: name,
                Email: email,
                Phone: phone,
                Startdate: startdate,
                Enddate: enddate,
            });
            alert('Data Updated Successfully');
            fetchData(); // Refresh data after updating
            clearForm();
        } catch (error) {
            alert('Failed to Update Data');
        }
    };

    // Deleting data from Firestore
    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, 'CRUD', id));
            alert('Data deleted successfully');
            fetchData(); // Refresh data after deleting
        } catch (error) {
            alert('Failed to delete data');
        }
    };

    // Open the email modal
    const openEmailModal = (email) => {
        setRecipientEmail(email);
        setIsEmailModalOpen(true);
    };

    // Close the email modal
    const closeEmailModal = () => {
        setIsEmailModalOpen(false);
        setEmailMessage('');
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            receiver_email: recipientEmail,
            message: emailMessage,
        };

        emailjs
            .send(
                'service_sy5e6ni', // Replace with your service ID
                'template_4itflrh', // Replace with your template ID
                templateParams,
                'PyR-bhUNuw0jLFht1' // Replace with your user ID
            )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Email sent successfully!');
                    closeEmailModal();
                },
                (error) => {
                    console.log('FAILED...', error);
                    alert('Failed to send email. Please try again.');
                }
            );
    };

    // Clear form data
    const clearForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            startdate: '',
            enddate: '',
        });
        setCurrentId(null);
    };

    // Handle navigation to Home
    const goToHome = () => {
        navigate('/'); // Redirect to home page
    };

    return (
        <div>
            {/* Home Button */}
           
            
            <div className="form_container">
                <h2>Add/Update Member</h2>
                <div className="box">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="box">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="box">
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="box">
                    <input
                        type="date"
                        id="startdate"
                        name="startdate"
                        placeholder="Start Date"
                        value={formData.startdate}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <div className="box">
                    <input
                        type="date"
                        id="enddate"
                        name="enddate"
                        placeholder="End Date"
                        value={formData.enddate}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                </div>
                <button onClick={addData}>Add</button>
                <button onClick={updateData}>Update</button>
                <button onClick={goToHome} className="home-button">Home</button>
            </div>

            <div className="database">
                <h2>Membership Database</h2>
                <div className="container" id="database-container">
                    {data.map((item) => (
                        <div className="box" key={item.id}>
                            <h3>Name: {item.Name}</h3>
                            <h3>Email: {item.Email}</h3>
                            <h3>Phone: {item.Phone}</h3>
                            <h3>Start Date: {item.Startdate}</h3>
                            <h3>End Date: {item.Enddate}</h3>
                            <button onClick={() => populateForm(item.id)}>Update</button>
                            <button onClick={() => deleteData(item.id)}>Delete</button>
                            <button onClick={() => openEmailModal(item.Email)}>Email</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Modal */}
            {isEmailModalOpen && (
                <div id="emailModal" className="dashboard-modal">
                    <div className="dashboard-modal-content">
                        <span className="close" onClick={closeEmailModal}>
                            &times;
                        </span>
                        <h2>Send Email</h2>
                        <form onSubmit={sendEmail}>
                            <div className="box">
                                <input
                                    style={{ width: '100%', height: '40px' }}
                                    type="email"
                                    value={recipientEmail}
                                    readOnly
                                />
                            </div>
                            <div className="box">
                                <textarea
                                    style={{ width: '100%', height: '200px' }}
                                    name="message"
                                    placeholder="Type your message here..."
                                    value={emailMessage}
                                    onChange={(e) => setEmailMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="mail-button">Send Message</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
