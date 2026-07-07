import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/' },
    { label: 'Products', icon: 'pi pi-box', path: '/products' },
    { label: 'Orders', icon: 'pi pi-shopping-cart', path: '/orders' },
    { label: 'Users', icon: 'pi pi-users', path: '/users' },
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: #0a0f1e;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          position: fixed;
          left: 0; top: 0;
          z-index: 100;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 16px;
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .logo-text {
          font-family: 'Orbitron', monospace;
          font-size: 13px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.5px;
        }
        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          transition: all 0.2s;
          border-left: 3px solid transparent;
          margin: 2px 0;
        }
        .menu-item:hover {
          color: white;
          background: rgba(255,255,255,0.04);
        }
        .menu-item.active {
          color: #38bdf8;
          background: rgba(56,189,248,0.08);
          border-left-color: #38bdf8;
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <i className="pi pi-shield" style={{ color: 'white', fontSize: '16px' }} />
          </div>
          <span className="logo-text">ADMIN</span>
        </div>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
          >
            <i className={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;