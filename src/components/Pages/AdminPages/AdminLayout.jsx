import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminNavBar = () => {
  return (
  <nav style={{ width: '100%', background: '#222', color: '#fff', padding: '1rem 0', marginBottom: '2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      <Link to={'/admin'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
      <Link to={'/admin/manageusers'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Manage Users</Link>
      <Link to={'/admin/managemembership'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Memberships</Link>
      <Link to={'/admin/addusermemberships'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Add User Memberships</Link>
      <Link to={'/admin/addtrainer'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Add Trainer Details</Link>
      <Link to={'/admin/paylist'} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Payments</Link>
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
