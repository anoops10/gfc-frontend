import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const UserLayout = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <Navbar expand="lg" variant="dark" style={{ background: '#222' }}>
        <Container>
          <Navbar.Toggle aria-controls="user-navbar-nav" />
          <Navbar.Collapse id="user-navbar-nav" className="justify-content-center">
            <Nav className="gap-2 gap-lg-3 w-100 justify-content-center text-center mt-2 mt-lg-0">
              <Nav.Link as={Link} to={'/user'} className="text-white fw-bold px-3 py-2">Profile</Nav.Link>
              <Nav.Link as={Link} to={'/user/showtrainers'} className="text-white fw-bold px-3 py-2">Show Trainers</Nav.Link>
              <Nav.Link as={Link} to={'/user/showmembership'} className="text-white fw-bold px-3 py-2">Show Membership Plans</Nav.Link>
              <Nav.Link as={Link} to={'/user/paymenthistory'} className="text-white fw-bold px-3 py-2">Show Payment History</Nav.Link>
              <Nav.Link as={Link} to={'/user/membershipdetails'} className="text-white fw-bold px-3 py-2">Show Membership Details</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default UserLayout;
