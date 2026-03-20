import React, { useState } from "react";
import { addNewUser } from "../../services/UserService";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PhoneInput from "react-phone-number-input/input";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export const Registration = () => {
  const [addUser, setAddUser] = useState({
    uName: "",
    emailId: "",
    password: "",
    phone: "",
    role: "",
    gender: "",
    dob: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  function onSubmit(e) {
    e.preventDefault();
    addNewUser(addUser, image);
    // console.log(addUser);
    // console.log(image);
  }

  return (
    <>
    <div className="registration-page-container">
      <div className="text-center fs-2 fw-semibold registration-title" style={{ color: '#808000' }}>Registration page</div>
      <Form
        className="mx-auto border border-1 rounded shadow-sm p-5 registration-form-card"
        style={{ 
          width: '96%',
          maxWidth: '1750px',
          position: 'relative'
        }}
        onSubmit={onSubmit}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="uName"
                value={addUser.uName}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={addUser.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-block">Gender</Form.Label>
              <ButtonGroup className="w-100">
                <ToggleButton
                  key="male"
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={addUser.gender === "Male"}
                  style={{ background: addUser.gender === "Male" ? '#808000' : 'transparent', border: '1px solid #808000', color: addUser.gender === "Male" ? 'white' : '#808000' }}
                  onChange={(e) => setAddUser({ ...addUser, gender: e.currentTarget.value })}
                >
                  Male
                </ToggleButton>
                <ToggleButton
                  key="female"
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={addUser.gender === "Female"}
                  style={{ background: addUser.gender === "Female" ? '#808000' : 'transparent', border: '1px solid #808000', color: addUser.gender === "Female" ? 'white' : '#808000' }}
                  onChange={(e) => setAddUser({ ...addUser, gender: e.currentTarget.value })}
                >
                  Female
                </ToggleButton>
              </ButtonGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="IN"
                className="form-control"
                name="phone"
                value={addUser.phone}
                onChange={(value) => setAddUser({ ...addUser, phone: value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="address"
                value={addUser.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="emailId"
                value={addUser.emailId}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={addUser.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={addUser.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Trainer">Trainer</option>
                <option value="Member">Member</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhoto">
              <Form.Label>Photo Upload</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Col>
        </Row>
        <div className="registration-btn-wrap mt-4" style={{ position: 'relative', zIndex: 1 }}>
          <Button variant="primary" size="lg" type="submit" style={{ background: 'white', color: '#808000', border: 'none' }}>
            Register
          </Button>
        </div>
      </Form>
      </div>
    </>
  );
}

