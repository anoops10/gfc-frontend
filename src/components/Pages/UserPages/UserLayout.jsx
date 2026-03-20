import React, { useEffect, useState } from 'react';
import { getImage, getUserById } from '../../../services/UserService';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const UserLayout = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Navbar expand="lg" variant="dark" style={{ background: '#222' }}>
        <Container>
          <Navbar.Toggle aria-controls="user-navbar-nav" />
          <Navbar.Collapse id="user-navbar-nav" className="justify-content-center">
            <Nav className="gap-3">
              <Nav.Link as={Link} to={'/user'} className="text-white fw-bold">Profile</Nav.Link>
              <Nav.Link as={Link} to={'/user/showtrainers'} className="text-white fw-bold">Show Trainers</Nav.Link>
              <Nav.Link as={Link} to={'/user/showmembership'} className="text-white fw-bold">Show Membership Plans</Nav.Link>
              <Nav.Link as={Link} to={'/user/paymenthistory'} className="text-white fw-bold">Show Payment History</Nav.Link>
              <Nav.Link as={Link} to={'/user/membershipdetails'} className="text-white fw-bold">Show Membership Details</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default UserLayout;
