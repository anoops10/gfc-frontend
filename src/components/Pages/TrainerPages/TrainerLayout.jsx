import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TrainerNavBar = () => {
  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.75rem',
    padding: '0 0.75rem'
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    background: '#333',
    padding: '0.55rem 0.85rem',
    borderRadius: '8px',
    textAlign: 'center'
  };

  return(
  <nav style={{ width: '100%', background: '#222', color: '#fff', padding: '1rem 0', marginBottom: '2rem' }}>
    <div style={navContainerStyle}>
      <Link to={'/trainer'} style={navLinkStyle}>Dashboard</Link>
      <Link to={'/trainer/clients'} style={navLinkStyle}>My Clients</Link>
      {/* <Link to={`/trainer/${emailId}/profile`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
      <Link to={`/trainer/${emailId}/logout`} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link> */}
    </div>
  </nav>
  )
};

const TrainerLayout = () => (
  <div>
    <TrainerNavBar />
    <Outlet />
  </div>
);

export default TrainerLayout;
