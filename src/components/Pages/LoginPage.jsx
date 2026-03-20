import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import loginSideImage from '../../images/Gym2.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        null,
        {
          params: {
            emailId,
            password
          },
          withCredentials: true
        }
      );

      const data = response.data;
      // data = { emailId, role, logedin: true } ← YOUR actual field name

      if (data.logedin) { // ✅ FIX 1: 'logedin' not 'success'
        
        // ✅ FIX 2: set isLoggedIn for Layout.jsx navbar
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', data.role);
        localStorage.setItem('emailId', data.emailId);

          window.dispatchEvent(new CustomEvent('authChange'));

        // Navigation logic
        if (data.role === 'Admin') {
          navigate('/admin');
        } else if (data.role === 'Trainer') {
          navigate('/trainer');
        } else {
          navigate('/user');
        }
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Server error. Please check if backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-standard">
      <div className="container-fluid px-4 px-md-5">
        <div className="text-center fs-2 fw-semibold login-title" style={{ color: '#808000' }}>
          Login Page
        </div>
        <Row className="align-items-center g-5 login-layout-row">
          <Col md={6} className="d-flex justify-content-center justify-content-md-start">
            <img src={loginSideImage} alt="Gym training area" className="login-image-spacer" />
          </Col>
          <Col md={6} className="d-flex justify-content-center justify-content-md-start">
            <Form className="login-standard-card" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Enter your registered email address"
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  required
                  disabled={loading}
                />
              </Form.Group>

              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              <div className="login-btn-wrap mt-auto">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={loading}
                  style={{ background: 'white', color: '#808000', border: 'none' }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginPage;
