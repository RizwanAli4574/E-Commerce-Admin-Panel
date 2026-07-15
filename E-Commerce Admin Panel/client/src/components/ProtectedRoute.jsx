import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ 
  display: 'flex', 
  background: '#020817', 
  minHeight: '100vh',
  overflow: 'hidden'
}}>
      <Sidebar />
      <div style={{ marginLeft: '240px', flex: 1 }}>
        <Navbar />
        <div style={{ marginTop: '64px', padding: '28px', color: 'white' }}>
          <h2>Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;