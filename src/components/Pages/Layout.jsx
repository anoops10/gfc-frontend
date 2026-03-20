import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../App.css";
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from "axios";
import logoImage from '../../images/logonobg.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  // Simulate login state (replace with real auth logic as needed)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
    const navigate = useNavigate();
  const mainContentRef = useRef(null);
  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('isLoggedIn', 'false');
  //   // Optionally redirect to home or login page
  // };

  const role = localStorage.getItem('role');
  const getHomeLink = () => {
    if (isLoggedIn && role) {
      if (role === 'Admin') return '/admin';
      if (role === 'Trainer') return '/trainer';
      return '/user';
    }
    return "/";
  };

  const handleLogout = async () => {
    try {
      // Backend: destroy server session
      await axios.post(`${API_BASE_URL}/logout`, {}, {
        withCredentials: true  // sends JSESSIONID cookie
      });
    } catch (err) {
      console.log('Backend logout failed:', err);  // usually OK if session already gone
    }

    // Frontend cleanup
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('role');
    localStorage.removeItem('emailId');

    // Redirect
    navigate('/login');  // or window.location.href = '/login';
  };

  const scrollToMainContent = () => {
    setTimeout(() => {
      mainContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  // Example: listen for login elsewhere in the app
    useEffect(() => {
  const handleAuthChange = () => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  };
  
  window.addEventListener('authChange', handleAuthChange);
  window.addEventListener('storage', handleAuthChange);
  
  // Initial check
  handleAuthChange();
  
  return () => {
    window.removeEventListener('authChange', handleAuthChange);
    window.removeEventListener('storage', handleAuthChange);
  };
}, []);


  return (
    <div className="home-container d-flex flex-column min-vh-100" style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <span>📞 +91-9876543210</span>
          <span>✉️ grootsfitness@email.com</span>
        </div>
        <div className="header-center">
          <span>Welcome to Groot's Fitness Club!</span>
        </div>
        <div className="header-right">
          <a href="https://www.facebook.com/GoldsGymIndia" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/GoldsGymIndia" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/goldsgymindia/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

      {/* Hero Section */}
      <Navbar expand="lg" className="hero-section" style={{ padding: '1px 20px' }} variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to={getHomeLink()} style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#808000', display: 'flex', alignItems: 'center', gap: '12px', padding: 0, lineHeight: 1, overflow: 'visible' }}>
            <img src={logoImage} alt="Groot's Fitness Club Logo" style={{ height: '96px', width: '96px', borderRadius: '8px', transform: 'scale(1.85)', transformOrigin: 'left center' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto hero-navbar">
              {!isLoggedIn && <Nav.Link as={Link} to="/" onClick={scrollToMainContent} className="text-white fw-bold">Home</Nav.Link>}
              {!isLoggedIn && <Nav.Link as={Link} to="/aboutus" onClick={scrollToMainContent} className="text-white fw-bold">About Us</Nav.Link>}
              {!isLoggedIn && <Nav.Link as={Link} to="/adduser" onClick={scrollToMainContent} className="text-white fw-bold">Register</Nav.Link>}
              {!isLoggedIn && <Nav.Link as={Link} to="/login" onClick={scrollToMainContent} className="text-white fw-bold">Login</Nav.Link>}
              {isLoggedIn && <Nav.Link onClick={handleLogout} className="text-white fw-bold" style={{ cursor: 'pointer' }}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel Section */}
      <main ref={mainContentRef} className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="footer mt-auto">
        <div className="footer-address">
          <h3>Groot's Fitness Club</h3>
          <p>123 Fitness Street, Mumbai, India</p>
          <p>Phone: +91-9876543210</p>
          <p>Email: grootsfitness@email.com</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          {/* <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul> */}
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/GoldsGymIndia" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/GoldsGymIndia" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/goldsgymindia/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-legal">
          <span>@2026 Groot's Fitness Club. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
