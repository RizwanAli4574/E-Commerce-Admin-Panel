import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const canvasRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.5 + 0.1,
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
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,179,237,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
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

        .login-root {
          min-height: 100vh;
          background: #020817;
          display: flex;
          align-items: center;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-canvas {
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
          background: radial-gradient(circle, rgba(56,189,248,0.12), transparent 70%);
          top: -100px; left: -100px;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%);
          bottom: -80px; right: 200px;
        }

        /* Left Panel */
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
        .brand-text {
          color: #38bdf8;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

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
          color: rgba(255,255,255,0.45);
          font-size: 15px;
          line-height: 1.8;
          max-width: 420px;
          margin-bottom: 52px;
          font-weight: 300;
        }

        .stats-row {
          display: flex;
          gap: 0;
          align-items: center;
        }
        .stat-item {
          padding: 0 28px 0 0;
        }
        .stat-item:first-child { padding-left: 0; }
        .stat-num {
          font-family: 'Orbitron', monospace;
          font-size: 30px;
          font-weight: 700;
          color: white;
          line-height: 1;
        }
        .stat-label {
          color: rgba(255,255,255,0.3);
          font-size: 12px;
          margin-top: 4px;
          letter-spacing: 0.5px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          margin-right: 28px;
        }

        /* Right Panel */
        .right-panel {
          width: 500px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 48px 48px 40px;
          position: relative;
          z-index: 1;
          margin-right: 40px;
        }

        /* Glowing border card */
        .form-card {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border-radius: 24px;
          padding: 40px;
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

        /* Animated blue line on left side of card */
        .form-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            #38bdf8 30%,
            #6366f1 60%,
            #38bdf8 80%,
            transparent 100%
          );
          background-size: 100% 200%;
          animation: lineFlow 3s linear infinite;
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 12px rgba(56,189,248,0.6), 0 0 24px rgba(56,189,248,0.3);
        }

        @keyframes lineFlow {
          0% { background-position: 0 100%; }
          100% { background-position: 0 -100%; }
        }

        /* Top glow line */
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
          margin-bottom: 22px;
          box-shadow: 0 8px 24px rgba(14,165,233,0.35);
        }

        .form-title {
          font-family: 'Orbitron', monospace;
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .form-subtitle {
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .field-group { margin-bottom: 20px; }

        .field-label {
          display: block;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .input-wrap { position: relative; }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.2);
          font-size: 13px;
          z-index: 2;
          pointer-events: none;
        }

        /* Email input */
        .custom-input {
          width: 100% !important;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          color: white !important;
          font-size: 14px !important;
          padding: 13px 16px 13px 40px !important;
          transition: all 0.25s !important;
          font-family: 'Outfit', sans-serif !important;
          height: 48px !important;
        }
        .custom-input:focus {
          border-color: rgba(56,189,248,0.5) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08), 0 0 16px rgba(56,189,248,0.1) !important;
          outline: none !important;
        }
        .custom-input::placeholder { color: rgba(255,255,255,0.18) !important; }

        /* Password input — same size as email */
        .p-password { width: 100% !important; display: block !important; }
        .p-password-input {
          width: 100% !important;
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 12px !important;
          color: white !important;
          font-size: 14px !important;
          padding: 13px 44px 13px 40px !important;
          transition: all 0.25s !important;
          font-family: 'Outfit', sans-serif !important;
          height: 48px !important;
        }
        .p-password-input:focus {
          border-color: rgba(56,189,248,0.5) !important;
          background: rgba(56,189,248,0.05) !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08), 0 0 16px rgba(56,189,248,0.1) !important;
          outline: none !important;
        }
        .p-password-input::placeholder { color: rgba(255,255,255,0.18) !important; }
        .p-password-toggle-mask-icon { color: rgba(255,255,255,0.25) !important; right: 14px !important; }

        .field-error {
          color: #f87171;
          font-size: 12px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 24px;
        }
        .forgot-link {
          color: #38bdf8;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          font-weight: 500;
        }
        .forgot-link:hover { opacity: 1; }

        .login-btn {
          width: 100% !important;
          background: linear-gradient(135deg, #0ea5e9, #6366f1) !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 14px !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          font-family: 'Outfit', sans-serif !important;
          letter-spacing: 0.5px !important;
          box-shadow: 0 8px 24px rgba(14,165,233,0.3) !important;
          transition: all 0.3s !important;
          cursor: pointer !important;
          height: 50px !important;
        }
        .login-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 14px 32px rgba(14,165,233,0.4) !important;
        }

        .form-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .left-panel { display: none; }
          .right-panel {
            width: 100%;
            margin-right: 0;
            padding: 24px;
          }
        }
      `}</style>

      <div className="login-root">
        <canvas ref={canvasRef} className="login-canvas" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Left Panel */}
        <div className="left-panel">
          <div className="brand-badge">
            <div className="brand-dot" />
            <span className="brand-text">E-Commerce Platform</span>
          </div>

          <h1 className="hero-title">
            Manage your
            <span className="highlight">Business Smarter</span>
          </h1>

          <p className="hero-desc">
            A powerful admin dashboard to track sales, manage products,
            handle orders, and grow your business — all in one place.
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

        {/* Right Panel */}
        <div className="right-panel">
          <div className="form-card">
            <div className="form-icon-wrap">
              <i className="pi pi-shield" style={{ color: "white", fontSize: "22px" }} />
            </div>
            <div className="form-title">WELCOME BACK</div>
            <div className="form-subtitle">Sign in to your admin account</div>

            {/* Email */}
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
                  <i className="pi pi-exclamation-circle" style={{ fontSize: "11px" }} />
                  {errors.email.message}
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
                  placeholder="Enter your password"
                  feedback={false}
                  toggleMask
                  inputClassName="p-password-input"
                />
              </div>
              {errors.password && (
                <div className="field-error">
                  <i className="pi pi-exclamation-circle" style={{ fontSize: "11px" }} />
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="forgot-row">
              <span className="forgot-link">Forgot password?</span>
            </div>

            <Button
              label="Sign In"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={handleSubmit(onSubmit)}
              className="login-btn"
            />

            <div className="form-footer">
              © 2026 E-Commerce Admin Panel — All rights reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;