import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import {
  setLoading,
  loginSuccess,
  loginFail,
  reset,
} from "../redux/slices/authSlice";

const schema = yup.object({
  name: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().oneOf(['seller', 'buyer'], 'Invalid role').required('Role is required'),
});

const SignUpPage = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const roleOptions = [
    { label: 'Seller', value: 'seller' },
    { label: 'Buyer', value: 'buyer' }
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'seller'
    }
  });

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading());
      // Call register service
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });
      dispatch(reset());
      navigate("/login", { state: { message: "Registration successful! Please sign in." } });
    } catch (error) {
      dispatch(loginFail(error.response?.data?.message || "Registration failed"));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.8,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.8 + 0.3,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${0.4 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .signup-root {
          min-height: 100vh;
          background: #0d1f3c;
          display: flex;
          align-items: center;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .signup-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%);
          top: -100px; left: -100px;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%);
          bottom: -80px; right: 200px;
        }
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 80px;
          position: relative;
          z-index: 1;
        }
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 100px;
          padding: 7px 16px;
          margin-bottom: 36px;
          width: fit-content;
        }
        .brand-dot {
          width: 8px; height: 8px;
          background: #38bdf8;
          border-radius: 50%;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        .brand-text { color: #38bdf8; font-size: 13px; font-weight: 500; letter-spacing: 0.5px; }
        .hero-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 900;
          color: white;
          line-height: 1.15;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }
        .hero-desc {
          color: rgba(255,255,255,0.95);
          font-size: 15px;
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 52px;
          font-weight: 300;
        }
        .stats-row { display: flex; gap: 0; align-items: center; }
        .stat-item { padding: 0 28px 0 0; }
        .stat-item:first-child { padding-left: 0; }
        .stat-num { font-family: 'Orbitron', monospace; font-size: 30px; font-weight: 700; color: white; line-height: 1; }
        .stat-label { color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 4px; letter-spacing: 0.5px; }
        .stat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.08); margin-right: 28px; }
        .right-panel {
          width: 550px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 48px;
          position: relative;
          z-index: 1;
          margin-right: 40px;
        }
        .form-card {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border-radius: 24px;
          padding: 36px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(20px);
          animation: fadeUp 0.7s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 3px; height: 100%;
          background: linear-gradient(180deg, transparent 0%, #38bdf8 30%, #6366f1 60%, #38bdf8 80%, transparent 100%);
          background-size: 100% 200%;
          animation: lineFlow 3s linear infinite;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 12px rgba(56,189,248,0.6), 0 0 24px rgba(56,189,248,0.3);
        }
        @keyframes lineFlow {
          0% { background-position: 0 100%; }
          100% { background-position: 0 -100%; }
        }
        .form-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #38bdf8, #6366f1, transparent);
          opacity: 0.6;
        }
        .form-icon-wrap {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(14,165,233,0.35);
        }
        .form-title { font-family: 'Orbitron', monospace; font-size: 22px; font-weight: 700; color: white; margin-bottom: 6px; letter-spacing: 0.5px; }
        .form-subtitle { color: rgba(255,255,255,0.8); font-size: 13px; margin-bottom: 24px; font-weight: 300; }
        .field-group { margin-bottom: 16px; }
        .field-label { display: block; color: rgba(255,255,255,0.8); font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 6px; }
        .input-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.8); font-size: 13px; z-index: 2; pointer-events: none; }
        .custom-input {
          width: 100% !important;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          color: white !important;
          font-size: 14px !important;
          padding: 11px 16px 11px 40px !important;
          transition: all 0.25s !important;
          font-family: 'Outfit', sans-serif !important;
          height: 44px !important;
        }
        .custom-input:focus {
          border-color: rgba(56,189,248,0.5) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08), 0 0 16px rgba(56,189,248,0.1) !important;
          outline: none !important;
        }
        .custom-dropdown {
          width: 100% !important;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          transition: all 0.25s !important;
          font-family: 'Outfit', sans-serif !important;
          height: 44px !important;
        }
        .custom-dropdown .p-dropdown-label {
          color: white !important;
          font-size: 14px !important;
          padding: 11px 16px 11px 40px !important;
          line-height: normal !important;
        }
        .custom-dropdown:focus, .custom-dropdown.p-focus {
          border-color: rgba(56,189,248,0.5) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08) !important;
        }
        .custom-dropdown .p-dropdown-trigger {
          color: rgba(255,255,255,0.6) !important;
        }
        .p-dropdown-panel {
          background: #0d1f3c !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 12px !important;
        }
        .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
          color: white !important;
          font-size: 14px !important;
          font-family: 'Outfit', sans-serif !important;
          padding: 10px 16px !important;
          transition: background 0.2s !important;
        }
        .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
          background: rgba(56,189,248,0.15) !important;
          color: #38bdf8 !important;
        }
        .p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
          background: rgba(255,255,255,0.05) !important;
        }
        .p-password { width: 100% !important; display: block !important; }
        .p-password-input {
          width: 100% !important;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          color: white !important;
          font-size: 14px !important;
          padding: 11px 44px 11px 40px !important;
          transition: all 0.25s !important;
          font-family: 'Outfit', sans-serif !important;
          height: 44px !important;
        }
        .p-password-input:focus {
          border-color: rgba(56,189,248,0.5) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08), 0 0 16px rgba(56,189,248,0.1) !important;
          outline: none !important;
        }
        .p-password-toggle-mask-icon { color: rgba(255,255,255,0.25) !important; right: 14px !important; }
        .field-error { color: #f87171; font-size: 12px; margin-top: 4px; display: flex; align-items: center; gap: 5px; }
        .server-error {
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.3);
          border-radius: 10px;
          padding: 8px 12px;
          color: #f87171;
          font-size: 13px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .signup-btn {
          width: 100% !important;
          background: linear-gradient(135deg, #0ea5e9, #6366f1) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 12px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: 'Outfit', sans-serif !important;
          letter-spacing: 0.5px !important;
          box-shadow: 0 8px 24px rgba(14,165,233,0.3) !important;
          transition: all 0.3s !important;
          cursor: pointer !important;
          height: 46px !important;
        }
        .signup-btn:hover { transform: translateY(-2px) !important; box-shadow: 0 14px 32px rgba(14,165,233,0.4) !important; }
        .form-footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center; color: rgba(255,255,255,0.8); font-size: 13px; }
        .form-footer a { color: #38bdf8; text-decoration: none; font-weight: 500; margin-left: 5px; }
        .form-footer a:hover { text-decoration: underline; }
        @media (max-width: 992px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; margin-right: 0; padding: 24px; }
        }
      `}</style>

      <div className="signup-root">
        <canvas ref={canvasRef} className="signup-canvas" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="left-panel">
          <div className="brand-badge">
            <div className="brand-dot" />
            <span className="brand-text">E-Commerce Platform</span>
          </div>
          <h1 className="hero-title">
            Join the
            <span className="highlight">E-Commerce Panel</span>
          </h1>
          <p className="hero-desc">
            Register your administrator profile to access the dashboard and manage sales, products, and order data in real time.
          </p>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">2.4k+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">98%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">500+</div>
              <div className="stat-label">Daily Orders</div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div
            className="form-card"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(onSubmit)()}
          >
            <div className="form-icon-wrap">
              <i
                className="pi pi-user-plus"
                style={{ color: "white", fontSize: "22px" }}
              />
            </div>
            <div className="form-title">CREATE ACCOUNT</div>
            <div className="form-subtitle">Register your details below</div>

            {/* Server Error */}
            {isError && (
              <div className="server-error">
                <i className="pi pi-exclamation-triangle" />
                {message}
              </div>
            )}

            {/* Full Name */}
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <div className="input-wrap">
                <i className="pi pi-user input-icon" />
                <InputText
                  {...register("name")}
                  placeholder="John Doe"
                  className="custom-input"
                />
              </div>
              {errors.name && (
                <div className="field-error">
                  <i
                    className="pi pi-exclamation-circle"
                    style={{ fontSize: "11px" }}
                  />
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Email Address */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className="input-wrap">
                <i className="pi pi-envelope input-icon" />
                <InputText
                  {...register("email")}
                  placeholder="admin@example.com"
                  className="custom-input"
                />
              </div>
              {errors.email && (
                <div className="field-error">
                  <i
                    className="pi pi-exclamation-circle"
                    style={{ fontSize: "11px" }}
                  />
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="field-group">
              <label className="field-label">Select Role</label>
              <div className="input-wrap">
                <i className="pi pi-briefcase input-icon" />
                <Dropdown
                  value={watch("role")}
                  options={roleOptions}
                  onChange={(e) => setValue("role", e.value, { shouldValidate: true })}
                  placeholder="Select Role"
                  className="custom-dropdown"
                />
              </div>
              {errors.role && (
                <div className="field-error">
                  <i
                    className="pi pi-exclamation-circle"
                    style={{ fontSize: "11px" }}
                  />
                  {errors.role.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <i className="pi pi-lock input-icon" />
                <Password
                  {...register("password")}
                  value={watch("password") || ""}
                  onChange={(e) =>
                    setValue("password", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Minimum 6 characters"
                  feedback={false}
                  toggleMask
                  inputClassName="p-password-input"
                />
              </div>
              {errors.password && (
                <div className="field-error">
                  <i
                    className="pi pi-exclamation-circle"
                    style={{ fontSize: "11px" }}
                  />
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <div className="input-wrap">
                <i className="pi pi-lock input-icon" />
                <Password
                  {...register("confirmPassword")}
                  value={watch("confirmPassword") || ""}
                  onChange={(e) =>
                    setValue("confirmPassword", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  placeholder="Confirm your password"
                  feedback={false}
                  toggleMask
                  inputClassName="p-password-input"
                />
              </div>
              {errors.confirmPassword && (
                <div className="field-error">
                  <i
                    className="pi pi-exclamation-circle"
                    style={{ fontSize: "11px" }}
                  />
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <Button
              label={isLoading ? "Registering..." : "Sign Up"}
              icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-user-plus"}
              iconPos="right"
              onClick={handleSubmit(onSubmit)}
              className="signup-btn"
              disabled={isLoading}
            />

            <div className="form-footer">
              Already have an account? 
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
