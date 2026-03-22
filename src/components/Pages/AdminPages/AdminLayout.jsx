import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminNavBar = () => {
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

  return (
  <nav style={{ width: '100%', background: '#222', color: '#fff', padding: '1rem 0', marginBottom: '2rem' }}>
    <div style={navContainerStyle}>
      <Link to={'/admin'} style={navLinkStyle}>Dashboard</Link>
      <Link to={'/admin/manageusers'} style={navLinkStyle}>Manage Users</Link>
      <Link to={'/admin/managemembership'} style={navLinkStyle}>Memberships</Link>
      <Link to={'/admin/addusermemberships'} style={navLinkStyle}>Add User Memberships</Link>
      <Link to={'/admin/addtrainer'} style={navLinkStyle}>Add Trainer Details</Link>
      <Link to={'/admin/paylist'} style={navLinkStyle}>Payments</Link>
    </div>
  </nav>
);
};

const AdminLayout = () => (
  <div>
    <AdminNavBar />
    <Outlet />
  </div>
);

export default AdminLayout;
