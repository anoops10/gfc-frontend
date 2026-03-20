import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TrainerNavBar = () => {
  return(
  <nav style={{ width: '100%', background: '#222', color: '#fff', padding: '1rem 0', marginBottom: '2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      <Link to={'/trainer'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
      <Link to={'/trainer/clients'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>My Clients</Link>
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
