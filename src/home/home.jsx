// Home.jsx
import React, { useState, useEffect } from 'react';
import CalorieCalculatorModal from '../components/CalorieCalculatorModal';
import MembershipStatusModal from '../components/MembershipStatusModal';
import './styles.css';
import '../App.css'
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAxtu5zdVRa6gCUAN7uPeqi3VeX9msVAbE',
  authDomain: 'crud-51f2d.firebaseapp.com',
  projectId: 'crud-51f2d',
  storageBucket: 'crud-51f2d.appspot.com',
  messagingSenderId: '171046847828',
  appId: '1:171046847828:web:84e1dda098c53a6c96f4c1',
};


const Home = () => {
  const [user, setUser] = useState(null); // State to track the authenticated user

  const auth = getAuth();

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is signed in
      } else {
        setUser(null); // User is signed out
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [auth]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have been logged out.');
      navigate('/'); // Redirect to the auth page after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };



  const [isCalorieModalOpen, setCalorieModalOpen] = useState(false);
  const [isMembershipModalOpen, setMembershipModalOpen] = useState(false);

  const toggleCalorieModal = () => setCalorieModalOpen(!isCalorieModalOpen);
  const toggleMembershipModal = () => setMembershipModalOpen(!isMembershipModalOpen);

  const [emailData, setEmailData] = useState({
    user_email: '',
    query: '',
  });

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your actual EmailJS service ID, template ID, and user ID
    emailjs.send(
      'service_sy5e6ni',
      'template_mfdhlxg',
      emailData,
      'PyR-bhUNuw0jLFht1'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again.');
      });
  };

  return (
    <div className='website-wrapper'>
      <section className="home" id="home">
        <div className="home-overlay"></div>

        {/* Main Navbar */}
        <nav className="main-navbar">
          <div className="logo">
            <a href="#home">
              <img src="images/home/logo.png" alt="Logo" />
            </a>
          </div>
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#our_team">Trainers</a></li>
            <li><a href="#pricing">Prices</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#calorie_burn">Calorie Burn</a></li>
          </ul>
          {user ? (
            <button className="btn join-us-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/auth" className="join-us-btn-wrapper">
              <button className="btn join-us-btn">Join Us</button>
            </Link>
          )}
          <div className="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        {/* Banner */}
        <div className="banner">
          <div className="banner-contents">
            <h2>Start your training at FitLife</h2>
            <h1>Fit body needs more training</h1>
            <p>
              At FitLife Hub, we believe that fitness is a journey, not a destination. Our team of expert trainers will guide you every step of the way to help you achieve your fitness goals.
            </p>
            <button className="btn read-more-btn" onClick={toggleCalorieModal}>Calculate your Calorie Burn</button>
            <button className="btn membership-status" onClick={toggleMembershipModal} style={{ marginLeft: '15px' }}>
              Check your Membership Status
            </button>
          </div>
        </div>
      </section>
      {/* modal */}

      {isCalorieModalOpen && <CalorieCalculatorModal onClose={toggleCalorieModal} />}
      {isMembershipModalOpen && <MembershipStatusModal onClose={toggleMembershipModal} />}

      <section className="facilities">
        <div className="facilities-contents">

          <div className="facility-item">
            <div className="facility-icon">
              <i className="fa-solid fa-dumbbell"></i>
            </div>
            <div className="facility-desc">
              <h2>State-of-the-Art Equipment</h2>
              <p>Our gym is equipped with the latest machines and free weights to help you achieve your fitness goals.</p>
            </div>
          </div>

          <div className="facility-item">
            <div className="facility-icon">
              <i className="fa-solid fa-wifi"></i>
            </div>
            <div className="facility-desc">
              <h2>Free Wifi</h2>
              <p>Stay connected while you sweat with our complimentary Wi-Fi</p>
            </div>
          </div>

          <div className="facility-item">
            <div className="facility-icon">
              <i className="fa-solid fa-person-swimming"></i>
            </div>
            <div className="facility-desc">
              <h2>Swimming Pool</h2>
              <p>Dive into fitness with our sparkling swimming pool</p>
            </div>
          </div>

        </div>
      </section>


      <section class="about" id="about">
        <div class="about-contents">

          <div class="about-left-col">
            <img src="images/about/gym-with-indoor-cycling-equipment.jpg" alt="" />
          </div>

          <div class="about-right-col">
            <h4>About Us</h4>
            <h1>Best Facilities and Experienced Trainers</h1>
            <p>At FitLife Hub, we believe that fitness is a journey, not a destination. Our team of expert
              trainers will guide you every step of the way to help you achieve your fitness goals. With our
              state-of-the-art equipment and supportive community, you'll be motivated to push yourself to new
              heights.</p>
            <div class="about-states">
              <div class="about-state about-state-1">
                <i class="fa-solid fa-person"></i>
                <h2>Best Trainers</h2>
              </div>
              <div class="about-state about-state-2">
                <i class="fa-solid fa-medal"></i>
                <h2>Award Winning</h2>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section class="services" id="services">

        <header class="section-header">
          <h3>Services</h3>
          <h1>Services Which We Offer</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua.</p>
        </header>
        <div class="services-contents">

          <div class="service-box">
            <div class="service-icon-box">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
            <div class="service-desc">
              <h2>Body Building</h2>
              <p>Sculpt Your Body with Our Expert Guidance</p>
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon-box">
              <i class="fa-solid fa-person-walking"></i>
            </div>
            <div class="service-desc">
              <h2>Fitness</h2>
              <p>Get Fit, Feel Great with Our Customized Programs</p>
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon-box">
              <i class="fa-solid fa-weight-hanging"></i>
            </div>
            <div class="service-desc">
              <h2>Boxing</h2>
              <p>Unleash Your Inner Fighter with Our Boxing Classes</p>
            </div>
          </div>

          <div class="service-box">
            <div class="service-icon-box">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
            <div class="service-desc">
              <h2>Crossfit</h2>
              <p>Take Your Fitness to the Next Level with Our Crossfit Training</p>
            </div>
          </div>

        </div>
      </section>

      <section class="offer">
        <div class="offer-overlay"></div>
        <div class="offer-contents">
          <h1>Start Your Training Today</h1>
          <span>&</span>
          <h3>Get 30% Discount</h3>
          <button class="btn start-training-btn">Join Now</button>
        </div>
      </section>
      <section class="our-team" id="our_team">
        <header class="section-header">
          <h3>Our Trainers</h3>
          <h1>Meet Our Experienced Trainers</h1>
          <p>Start your fitness journey with our qualified and Experienced trainers! Get yourself to next level!
          </p>
        </header>
        <div class="team-contents">

          <div class="trainer-card">
            <div class="trainer-image">
              <img src="images/trainers/cheerful-sportive-man-is-posing-photographer-dark-gym-club.jpg" />
            </div>
            <div class="trainer-desc">
              <h2>John Doe</h2>
              <p>Muscles Trainer</p>
            </div>
            <div class="trainer-contact">
              <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div class="trainer-card">
            <div class="trainer-image">
              <img
                src="images/trainers/full-body-portrait-athletic-shirtless-male-doing-biceps-workouts-with-dumbbells-gym-club.jpg" />
            </div>
            <div class="trainer-desc">
              <h2>Jane Doe</h2>
              <p>Boxing Trainer</p>
            </div>
            <div class="trainer-contact">
              <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div class="trainer-card">
            <div class="trainer-image">
              <img
                src="images/trainers/serious-attractive-man-is-doing-exercises-with-training-apparatus-dark-gym-club.jpg" />
            </div>
            <div class="trainer-desc">
              <h2>Tom Anderson</h2>
              <p>Fitness Trainer</p>
            </div>
            <div class="trainer-contact">
              <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i class="fa-brands fa-twitter"></i></a>
              <a href="#"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>

        </div>
      </section>

      <section class="pricing" id="pricing">

        <header class="section-header">
          <h3>Pricing</h3>
          <h1>Join Suitable Plan</h1>
          <p>Choose the plan that suits you! </p>
        </header>
        <div class="pricing-contents">

          <div class="pricing-card">
            <div class="pricing-card-header">
              <span class="pricing-card-title">Silver</span>
              <div class="price-circle">
                <span class="price"><i>$</i>12.99</span>
                <span class="desc">/ Month</span>
              </div>
            </div>

            <div class="pricing-card-body">
              <ul>
                <li><i class="fa-solid fa-check"></i>15 body Building</li>
                <li><i class="fa-solid fa-check"></i>10 Boxing Classes</li>
                <li><i class="fa-solid fa-check"></i>5 Massage</li>
                <li><i class="fa-solid fa-check"></i>12 Swimming Sessions</li>
              </ul>
              <button class="btn price-plan-btn">Select Plan</button>
            </div>
          </div>
          <div class="pricing-card">
            <div class="pricing-card-header">
              <div class="tag-box">
                <span class="tag">Recommend</span>
              </div>
              <span class="pricing-card-title">Gold</span>
              <div class="price-circle">
                <span class="price"><i>$</i>36.99</span>
                <span class="desc">/ Month</span>
              </div>
            </div>

            <div class="pricing-card-body">
              <ul>
                <li><i class="fa-solid fa-check"></i>15 body Building</li>
                <li><i class="fa-solid fa-check"></i>10 Boxing Classes</li>
                <li><i class="fa-solid fa-check"></i>5 Massage</li>
                <li><i class="fa-solid fa-check"></i>12 Swimming Sessions</li>
              </ul>
              <button class="btn price-plan-btn">Select Plan</button>
            </div>
          </div>
          <div class="pricing-card">
            <div class="pricing-card-header">
              <span class="pricing-card-title">Platinum</span>
              <div class="price-circle">
                <span class="price"><i>$</i>74.99</span>
                <span class="desc">/ Month</span>
              </div>
            </div>

            <div class="pricing-card-body">
              <ul>
                <li><i class="fa-solid fa-check"></i>15 body Building</li>
                <li><i class="fa-solid fa-check"></i>10 Boxing Classes</li>
                <li><i class="fa-solid fa-check"></i>5 Massage</li>
                <li><i class="fa-solid fa-check"></i>12 Swimming Sessions</li>
              </ul>
              <button class="btn price-plan-btn">Select Plan</button>
            </div>
          </div>

        </div>
      </section>

      <section class="blog" id="blog">
        <header class="section-header">
          <h3>Our Blog</h3>
          <h1>Latest From Our Blog</h1>
          <p>Stay fit, stay healthy! Our blog is dedicated to providing you with the latest fitness trends,
            workout tips, and healthy living advice. From weight loss to muscle gain, we've got you covered.
            Follow our blog to stay motivated and inspired on your fitness journey.</p>
        </header>

        <div class="blog-contents">

          <div class="article-card">
            <img src="images/posts/kettlebell-gym-equipment-still-life.jpg" />
            <div class="category">
              <div class="subject">
                <h3>muscles</h3>
              </div>
              <span>02/06/2023</span>
            </div>
            <h2 class="article-title">Strong Muscle: How to Build Endurance.</h2>
            <p class="article-desc">Learn how to build strong muscles with our expert tips and tricks. From
              weightlifting to cardio, we've got you covered.</p>
            <div class="article-views">
              <span>4.5k <i class="fa-solid fa-eye"></i></span>
              <span>552 <i class="fa-solid fa-comment"></i></span>
            </div>
          </div>

          <div class="article-card">
            <img
              src="images/posts/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club.jpg" />
            <div class="category">
              <div class="subject">
                <h3>Flexibility</h3>
              </div>
              <span>21/06/2023</span>
            </div>
            <h2 class="article-title">Increase Your Flexibility: Tips and Tricks</h2>
            <p class="article-desc">Improve your flexibility with our expert advice. From yoga to stretching,
              we'll show you how to increase your range of motion.</p>
            <div class="article-views">
              <span>1.5k <i class="fa-solid fa-eye"></i></span>
              <span>352 <i class="fa-solid fa-comment"></i></span>
            </div>
          </div>

          <div class="article-card">
            <img src="images/posts/strong-man-training-gym.jpg" />
            <div class="category">
              <div class="subject">
                <h3> Cardio</h3>
              </div>
              <span>07/06/2023</span>
            </div>
            <h2 class="article-title">Boost Your Cardio: Tips for a Healthy Heart.</h2>
            <p class="article-desc">Get your heart rate up with our cardio tips and tricks. From running to
              cycling, we'll show you how to improve your cardiovascular health.</p>
            <div class="article-views">
              <span>3.5k <i class="fa-solid fa-eye"></i></span>
              <span>420 <i class="fa-solid fa-comment"></i></span>
            </div>
          </div>

        </div>
        <div class="view-more-btn-container">
          <button class="btn articles-view-btn">View More</button>
        </div>
      </section>
      <section class="page-footer">

        <div class="footer-contents">

          <div class="footer-col footer-col-1">
            <div class="footer-col-title">
              <h3>About</h3>
            </div>
            <div class="footer-col-desc">
              <p>At FitLife Hub, we believe that fitness is a journey, not a destination. Our team of expert
                trainers will guide you every step of the way to help you achieve your fitness goals. With
                our state-of-the-art equipment and supportive community, you'll be motivated to push
                yourself to new heights.</p>

              <span>321 Street, Sydney, NSW 2000, Australia</span>
              <span>+61 2 1234 5678</span>
              <span>fitlife@admin.com</span>
              <div class="footer-social-media">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>

          <div class="footer-col footer-col-2">
            <div class="footer-col-title">
              <h3>Quick Links</h3>
            </div>
            <div class="footer-col-desc">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#our_team">Trainers</a>
              <a href="#pricing">Pricing</a>
              <a href="#blog">Blog</a>

            </div>
          </div>

          <div class="footer-col footer-col-3">
            <div class="footer-col-title">
              <h3>Got Queries About Your Membership?</h3>
            </div>
            <div class="footer-col-desc">
              <p>Have a question about your membership? We're here to help! Whether you're wondering about our
                services, pricing, or just need some general information, our team is dedicated to providing
                you with the best possible support. Fill out the form below and we'll get back to you as
                soon as possible.</p>
              <form onSubmit={sendEmail} class="membership" id="membership_form">

                <input type="text" name="query" id="query" placeholder="Your Query"

                  value={emailData.query}
                  onChange={handleChange} />
                <input type="email" name="user_email" id="email" placeholder="Your Email"

                  value={emailData.user_email}
                  onChange={handleChange}
                />
                <button class="btn membership" id="send" type="submit">Send</button>
              </form>
            </div>
          </div>

        </div>

      </section>

      <div class="copy-rights">
        <p>Created By <b>Name of your group</b> All Rights Reserved</p>
      </div>




    </div>
  )
};

export default Home;














// Components used within the main component
const FacilityItem = ({ icon, title, description }) => (
  <div className="facility-item">
    <div className="facility-icon">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="facility-desc">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

const AboutState = ({ icon, title }) => (
  <div className="about-state">
    <i className={`fa-solid ${icon}`}></i>
    <h2>{title}</h2>
  </div>
);

const ServiceBox = ({ icon, title, description }) => (
  <div className="service-box">
    <div className="service-icon-box">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="service-desc">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
);

const TrainerCard = ({ name, role, image }) => (
  <div className="trainer-card">
    <div className="trainer-image">
      <img src={image} alt={name} />
    </div>
    <div className="trainer-desc">
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
    <div className="trainer-contact">
      <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
      <a href="#"><i className="fa-brands fa-twitter"></i></a>
      <a href="#"><i className="fa-brands fa-instagram"></i></a>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, recommended }) => (
  <div className={`pricing-card ${recommended ? "recommended" : ""}`}>
    <div className="pricing-card-header">
      {recommended && <div className="tag-box"><span className="tag">Recommend</span></div>}
      <span className="pricing-card-title">{title}</span>
      <div className="price-circle">
        <span className="price"><i>$</i>{price}</span>
        <span className="desc">/ Month</span>
      </div>
    </div>
    <div className="pricing-card-body">
      <ul>
        {features.map((feature, index) => <li key={index}><i className="fa-solid fa-check"></i>{feature}</li>)}
      </ul>
      <button className="btn price-plan-btn">Select Plan</button>
    </div>
  </div>
);

const ArticleCard = ({ title, category, date, image, views, comments }) => (
  <div className="article-card">
    <img src={image} alt={title} />
    <div className="category">
      <div className="subject">
        <h3>{category}</h3>
      </div>
      <span>{date}</span>
    </div>
    <h2 className="article-title">{title}</h2>
    <p className="article-desc">{title}</p>
    <div className="article-views">
      <span>{views} <i className="fa-solid fa-eye"></i></span>
      <span>{comments} <i className="fa-solid fa-comment"></i></span>
    </div>
  </div>
);

const FooterColumn = ({ title, description, address, phone, email, socialLinks, links, form }) => (
  <div className={`footer-col ${form ? "footer-col-3" : ""}`}>
    <div className="footer-col-title">
      <h3>{title}</h3>
    </div>
    <div className="footer-col-desc">
      {description && <p>{description}</p>}
      {address && <span>{address}</span>}
      {phone && <span>{phone}</span>}
      {email && <span>{email}</span>}
      {links && links.map((link, index) => <a key={index} href={link}>{link.split("#")[1]}</a>)}
      {form && (
        <form className="membership" id="membership_form">
          <input type="text" name="query" id="query" placeholder="Your Query" />
          <input type="email" name="user_email" id="email" placeholder="Your Email" />
          <button className="btn membership" id="send" type="submit">Send</button>
        </form>
      )}
      {socialLinks && (
        <div className="footer-social-media">
          {socialLinks.map((link, index) => (
            <a key={index} href="#"><i className={`fa-brands fa-${link}`}></i></a>
          ))}
        </div>
      )}
    </div>
  </div>
);