import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/slices/authSlice";
import authService from "../services/authService";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <>
      {/* <style>{`
     .navbar {
     position: fixed;
     top: 0; left: 240px; right: 0;
     width: auto
     height: 64px;
     background: #0a0f1e;
     border-bottom: 1px solid rgba(225,225,225,0.06);
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 28px;
     z-index: 99;
     font-family: 'Outfit', Sans-serif;
     }
     .navbar-left{
     display: flex;
     align-items: center;
     gap: 8px;
     color: rgba(225,225,225,0.4)};
     font-size: 13px;
    }
     .navbar-right {
      dispaly: flex;
      align-items: center;
      gap: 16px;
     }
     .navbar-user {
     dispaly: flex;
     align-items: center;
     gap: 10px;
     }
     .navbar-avatar {
     width: 34px; height: 34px;
     background: linear-gradient(135deg, #0ea5e9, #6366f1);
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 13px;
     font-weight: 600;
     color: white;
     }
     .navbar-username{
     color: white;
     font-size: 13px;
     font-weight: 500;
     }
     .navbar-role{
     color: #38bdf8;
     font-size: 11px;
     text-transform: uppercase;
     letter-spacing: 0.5px;
     }
     .logout-btn {
     display: flex;
     align-items: center;
     gap: 6px;
     background: rgba(248,113,113,0.1);
     border: 1px solid rgba(248,113,113,0.2);
     color: #f87171;
     padding: 7px 14px;
     border-radius: 8px;
     font-size: 13px;
     cursor: pointer;
     transition: all 0.2s;
     font-family: 'Outfit' , sans-serif;
     }
     .logout-btn:hover {
     background: rgba(248,113,113,0.2);}
    `}</style> */}

      <style>{`
     .navbar {
       position: fixed;
       top: 0; 
       left: 240px; 
       right: 0;
       height: 64px;
       background: #0a0f1e;
       border-bottom: 1px solid rgba(225,225,225,0.06);
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 0 28px;
       z-index: 99;
       font-family: 'Outfit', Sans-serif;
     }
     .navbar-left {
       display: flex;
       align-items: center;
       gap: 8px;
       color: rgba(225,225,225,0.8);
       font-size: 13px;
     }
     .navbar-right {
       display: flex;
       align-items: center;
       gap: 16px;
     }
     .navbar-user {
       display: flex;
       align-items: center;
       gap: 10px;
     }
     .navbar-avatar {
       width: 34px; 
       height: 34px;
       background: linear-gradient(135deg, #0ea5e9, #6366f1);
       border-radius: 50%;
       display: flex;
       align-items: center;
       justify-content: center;
       font-size: 13px;
       font-weight: 600;
       color: white;
     }
     .navbar-username {
       color: white;
       font-size: 13px;
       font-weight: 500;
     }
     .navbar-role {
       color: #38bdf8;
       font-size: 11px;
       text-transform: uppercase;
       letter-spacing: 0.5px;
     }
     .logout-btn {
       display: flex;
       align-items: center;
       gap: 6px;
       background: rgba(248,113,113,0.1);
       border: 1px solid rgba(248,113,113,0.2);
       color: #f87171;
       padding: 7px 14px;
       border-radius: 8px;
       font-size: 13px;
       cursor: pointer;
       transition: all 0.2s;
       font-family: 'Outfit', sans-serif;
     }
     .logout-btn:hover {
       background: rgba(248,113,113,0.2);
     }
    `}</style>

      <div className="navbar">
        <div className="navbar-left">
          <i className="pi pi-home" style={{ fontSize: "14px" }} />
          <span>Dashboard</span>
        </div>

        <div className="navbar-right">
          <div className="navbar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <i className="pi pi-sign-out" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
