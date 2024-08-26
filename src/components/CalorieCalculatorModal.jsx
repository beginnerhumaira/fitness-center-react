import React, { useState } from 'react';

const CalorieCalculatorModal = ({ onClose }) => {
    const [weight, setWeight] = useState('');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState('sedentary');
    const [result, setResult] = useState('');

    const calculateBurn = (event) => {
        event.preventDefault();

        if (!weight || !heightFeet || !heightInches || !age || !gender || !activity) {
            setResult('Please fill in all fields.');
            return;
        }

        const totalHeightInches = parseInt(heightFeet) * 12 + parseInt(heightInches);

        let bmr;
        if (gender === 'male') {
            bmr = 66 + 6.2 * parseFloat(weight) + 12.7 * totalHeightInches - 6.8 * parseInt(age);
        } else {
            bmr = 655 + 4.35 * parseFloat(weight) + 4.7 * totalHeightInches - 4.7 * parseInt(age);
        }

        let calorieBurn;
        switch (activity) {
            case 'sedentary':
                calorieBurn = bmr * 1.2;
                break;
            case 'light':
                calorieBurn = bmr * 1.375;
                break;
            case 'moderate':
                calorieBurn = bmr * 1.55;
                break;
            case 'active':
                calorieBurn = bmr * 1.725;
                break;
            case 'veryActive':
                calorieBurn = bmr * 1.9;
                break;
            case 'extraActive':
                calorieBurn = bmr * 2.425;
                break;
            default:
                calorieBurn = 0;
        }

        setResult(`Your daily calorie burn is approximately ${calorieBurn.toFixed(2)} calories.`);
        // Reset form fields
        setWeight('');
        setHeightFeet('');
        setHeightInches('');
        setAge('');
        setGender('male');
        setActivity('sedentary');
    };

    return (
        <div id="calorieModal" className="modal" style={{ display: 'block', position: 'fixed', left: 0, top: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <div className="container">
                    <div className="form-container calculator-container">
                        <form onSubmit={calculateBurn}>
                            <h1 id="calculator-heading">Calorie Burn Calculator</h1>
                            <label htmlFor="weight-input">Weight (pounds):</label>
                            <input type="number" id="weight-input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Enter your weight" style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#f9f9f9', fontSize: '16px' }} />
                            <br /><br />
                            <label htmlFor="height-feet-input">Height (feet):</label>
                            <input type="number" id="height-feet-input" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} placeholder="Feet" style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#f9f9f9', fontSize: '16px' }} />
                            <label htmlFor="height-inches-input">Height (inches):</label>
                            <input type="number" id="height-inches-input" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} placeholder="Inches" style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#f9f9f9', fontSize: '16px' }} />
                            <br /><br />
                            <label htmlFor="age-input">Age:</label>
                            <input type="number" id="age-input" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter your age" style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#FFF', fontSize: '16px' }} />
                            <br /><br />
                            <label htmlFor="gender-select">Gender:</label>
                            <select id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#f9f9f9', fontSize: '16px' }}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <br /><br />
                            <label htmlFor="activity-select">Activity Level:</label>
                            <select id="activity-select" value={activity} onChange={(e) => setActivity(e.target.value)} style={{ width: '100%', padding: '12px 15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #f89c33', backgroundColor: '#f9f9f9', fontSize: '16px' }}>
                                <option value="sedentary">Sedentary (little or no exercise)</option>
                                <option value="light">Light (exercise 1-3 times/week)</option>
                                <option value="moderate">Moderate (exercise 4-5 times/week)</option>
                                <option value="active">Active (daily exercise or intense exercise 3-4 times/week)</option>
                                <option value="veryActive">Very Active (intense exercise 6-7 times/week)</option>
                                <option value="extraActive">Extra Active (very intense exercise daily, or physical job)</option>
                            </select>
                            <br /><br />
                            <button type="submit" id="calculate-button" style={{ width: '100%', padding: '15px', marginTop: '10px', marginBottom: '10px', backgroundColor: '#f89c33', color: 'white', fontSize: '16px', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease' }}>Calculate</button>
                        </form>
                        {result && (
                            <div className="box" id="result" style={{ marginTop: '20px', padding: '20px', borderRadius: '15px', backgroundColor: '#fff', fontSize: '18px', color: '#333', textAlign: 'center', border: '1px solid #f89c33', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', opacity: 1, transform: 'translateY(0)', fontWeight: 'bold' }}>
                                {result}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalorieCalculatorModal;
