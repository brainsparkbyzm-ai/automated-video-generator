import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Cpu,
  Sparkles,
  Zap,
  BrainCircuit
} from "lucide-react";

import "./Login.css";

const TERMINAL_LINES = [
  "Booting BrainSpark AI Core...",
  "Loading Neural Network...",
  "Connecting Quantum Engine...",
  "Initializing Workspace...",
  "Authentication Ready."
];

const HUD_DATA = [
  { title: "AI CORE", value: "ONLINE" },
  { title: "NETWORK", value: "SECURE" },
  { title: "LATENCY", value: "08 ms" },
  { title: "CPU LOAD", value: "17%" },
  { title: "RAM", value: "12.4 GB" },
  { title: "SECURITY", value: "AES-256" }
];

export default function Login() {

  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [typingText, setTypingText] = useState("");

  /* =========================
     REFS
  ========================= */

  const cardRef = useRef(null);

  const shineRef = useRef(null);

  const cursorRef = useRef(null);

  const matrixRef = useRef(null);

  const eyeRef = useRef(null);

  /* =========================
     LOGIN
  ========================= */

  const loginUser = useCallback(async () => {

    if (!email.trim()) {

      alert("Please enter email.");

      return;

    }

    if (!password.trim()) {

      alert("Please enter password.");

      return;

    }

    try {

      setLoading(true);

      await signInWithEmailAndPassword(

        auth,

        email,

        password

      );

      navigate("/dashboard");

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  }, [email, password, navigate]);

  /* =========================
     TERMINAL TYPING
  ========================= */

  useEffect(() => {

    let lineIndex = 0;

    let character = 0;

    const interval = setInterval(() => {

      setTypingText(

        TERMINAL_LINES[lineIndex].slice(

          0,

          character

        )

      );

      character++;

      if (

        character >

        TERMINAL_LINES[lineIndex].length

      ) {

        character = 0;

        lineIndex++;

        if (

          lineIndex >=

          TERMINAL_LINES.length

        ) {

          lineIndex = 0;

        }

      }

    }, 70);

    return () => clearInterval(interval);

  }, []);

  /* =========================
     CUSTOM CURSOR
  ========================= */

  useEffect(() => {

    const cursor = cursorRef.current;

    if (!cursor) return;

    const moveCursor = (e) => {

      cursor.style.left = `${e.clientX}px`;

      cursor.style.top = `${e.clientY}px`;

    };

    window.addEventListener(

      "mousemove",

      moveCursor

    );

    return () => {

      window.removeEventListener(

        "mousemove",

        moveCursor

      );

    };

  }, []);

  /* =========================
     PART 2 STARTS HERE
  ========================= */
    /* =========================
     MATRIX RAIN
  ========================= */

  useEffect(() => {

    const container = matrixRef.current;

    if (!container) return;

    const chars =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";

    const nodes = [];

    for (let i = 0; i < 140; i++) {

      const span = document.createElement("span");

      span.className = "matrix-char";

      span.innerText =
        chars[
          Math.floor(
            Math.random() * chars.length
          )
        ];

      span.style.left =
        Math.random() * 100 + "%";

      span.style.animationDelay =
        Math.random() * 10 + "s";

      span.style.animationDuration =
        4 + Math.random() * 8 + "s";

      span.style.fontSize =
        10 + Math.random() * 12 + "px";

      container.appendChild(span);

      nodes.push(span);

    }

    return () => {

      nodes.forEach(node => node.remove());

    };

  }, []);

  /* =========================
     AI EYE
  ========================= */

  useEffect(() => {

    const eye = eyeRef.current;

    if (!eye) return;

    const moveEye = (e) => {

      const rect =
        eye.parentElement.getBoundingClientRect();

      const cx =
        rect.left + rect.width / 2;

      const cy =
        rect.top + rect.height / 2;

      const angle = Math.atan2(

        e.clientY - cy,

        e.clientX - cx

      );

      const radius = 14;

      const x =
        Math.cos(angle) * radius;

      const y =
        Math.sin(angle) * radius;

      eye.style.transform =
        `translate(${x}px,${y}px)`;

    };

    window.addEventListener(
      "mousemove",
      moveEye
    );

    return () => {

      window.removeEventListener(
        "mousemove",
        moveEye
      );

    };

  }, []);

  /* =========================
     CARD PARALLAX
  ========================= */

  const handleCardMove = useCallback(

    (e) => {

      const card = cardRef.current;

      const shine = shineRef.current;

      if (!card || !shine) return;

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        -(y - centerY) / 22;

      const rotateY =
        (x - centerX) / 22;

      card.style.transform = `
        perspective(1600px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;

      shine.style.left = `${x}px`;

      shine.style.top = `${y}px`;

    },

    []

  );

  const resetCard = useCallback(() => {

    const card = cardRef.current;

    if (!card) return;

    card.style.transform = `
      perspective(1600px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  }, []);

  /* =========================
     CARD FLOAT
  ========================= */

  useEffect(() => {

    const card = cardRef.current;

    if (!card) return;

    let frame;

    let t = 0;

    const animate = () => {

      t += 0.015;

      const y =
        Math.sin(t) * 6;

      card.style.translate =
        `0 ${y}px`;

      frame =
        requestAnimationFrame(animate);

    };

    animate();

    return () =>

      cancelAnimationFrame(frame);

  }, []);

  /* =========================
     PART 3 STARTS HERE
  ========================= */
    return (

    <div className="login-page">

      {/* ===============================
          BACKGROUND SYSTEM
      =============================== */}

      <div className="vignette"></div>

      <div className="noise-layer"></div>

      <div className="galaxy-bg">

        <div className="galaxy-layer g1"></div>
        <div className="galaxy-layer g2"></div>
        <div className="galaxy-layer g3"></div>
        <div className="galaxy-layer g4"></div>
        <div className="galaxy-layer g5"></div>

      </div>

      {/* ===============================
          STARS
      =============================== */}

      <div className="stars-field">

        {

          Array.from({ length: 140 }).map((_, i) => (

            <span

              key={`star-${i}`}

              className="star"

              style={{

                left: `${Math.random() * 100}%`,

                top: `${Math.random() * 100}%`,

                animationDelay: `${Math.random() * 10}s`,

                animationDuration: `${4 + Math.random() * 6}s`

              }}

            />

          ))

        }

      </div>

      {/* ===============================
          SHOOTING STARS
      =============================== */}

      <div className="shooting-stars">

        <span className="meteor m1"></span>
        <span className="meteor m2"></span>
        <span className="meteor m3"></span>
        <span className="meteor m4"></span>
        <span className="meteor m5"></span>

      </div>

      {/* ===============================
          SPACE DUST
      =============================== */}

      <div className="space-dust">

        {

          Array.from({ length: 70 }).map((_, i) => (

            <span

              key={`dust-${i}`}

              className="dust"

              style={{

                left: `${Math.random() * 100}%`,

                top: `${Math.random() * 100}%`,

                animationDelay: `${Math.random() * 8}s`,

                animationDuration: `${8 + Math.random() * 8}s`

              }}

            />

          ))

        }

      </div>

      {/* ===============================
          AURORA
      =============================== */}

      <div className="aurora-system">

        <div className="aurora a1"></div>

        <div className="aurora a2"></div>

        <div className="aurora a3"></div>

      </div>

      {/* ===============================
          LIGHT RAYS
      =============================== */}

      <div className="light-rays">

        <span className="ray r1"></span>
        <span className="ray r2"></span>
        <span className="ray r3"></span>
        <span className="ray r4"></span>

      </div>

      {/* ===============================
          GLASS REFLECTION
      =============================== */}

      <div className="glass-overlay">

        <div className="glass-shine shine1"></div>

        <div className="glass-shine shine2"></div>

      </div>

      {/* ===============================
          PART 4 STARTS HERE
      =============================== */}
            {/* ===============================
          AI CORE
      =============================== */}

      <div className="ai-core">

        <div className="core"></div>

        <div className="ring r1"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>

        <div className="orbit o1"></div>
        <div className="orbit o2"></div>
        <div className="orbit o3"></div>
        <div className="orbit o4"></div>
        <div className="orbit o5"></div>

      </div>

      {/* ===============================
          HOLOGRAM HEXAGONS
      =============================== */}

      <div className="hologram-system">

        <div className="hex hex1"></div>
        <div className="hex hex2"></div>
        <div className="hex hex3"></div>
        <div className="hex hex4"></div>
        <div className="hex hex5"></div>
        <div className="hex hex6"></div>

      </div>

      {/* ===============================
          MATRIX GRID
      =============================== */}

      <div className="matrix-bg"></div>

      <div className="grid-overlay"></div>

      <div className="scan-line"></div>

      {/* ===============================
          CYBER LIGHTS
      =============================== */}

      <div className="cyber-light left"></div>

      <div className="cyber-light right"></div>

      <div className="orb red"></div>

      <div className="orb blue"></div>

      <div className="orb small"></div>

      {/* ===============================
          PARTICLES
      =============================== */}

      <div className="particles">

        <div className="neural-network">

          <span className="line l1"></span>
          <span className="line l2"></span>
          <span className="line l3"></span>
          <span className="line l4"></span>
          <span className="line l5"></span>
          <span className="line l6"></span>

        </div>

        {

          Array.from({ length: 90 }).map((_, i) => (

            <span

              key={`particle-${i}`}

              className="particle"

              style={{

                left: `${Math.random() * 100}%`,

                animationDelay: `${Math.random() * 8}s`,

                animationDuration: `${5 + Math.random() * 6}s`

              }}

            />

          ))

        }

      </div>

      {/* ===============================
          MATRIX RAIN
      =============================== */}

      <div

        ref={matrixRef}

        className="matrix-rain"

      ></div>

      {/* ===============================
          CUSTOM CURSOR
      =============================== */}

      <div

        ref={cursorRef}

        className="cyber-cursor"

      ></div>

      {/* ===============================
          PAGE WRAPPER
      =============================== */}

      <div className="login-wrapper">

      {/* ===============================
          PART 5 STARTS HERE
      =============================== */}
              {/* ===============================
            LEFT PANEL
        =============================== */}

        <div className="left-panel">

          {/* ===== AI EYE ===== */}

          <div className="ai-eye">

            <div
              ref={eyeRef}
              className="eye-ball"
            ></div>

          </div>

          {/* ===== LOGO ===== */}

          <h1 className="logo">

            BrainSpark AI

          </h1>

          <span className="version">

            PREMIUM AI WORKSPACE

          </span>

          {/* ===== HERO ===== */}

          <h2 className="hero-title">

            CREATE

            <br />

            WITHOUT

            <br />

            LIMITS

          </h2>

          <p className="hero-text">

            One intelligent platform for AI Writing,

            AI Images,

            AI Video,

            Automation,

            Coding,

            Research,

            Prompt Engineering

            and much more.

          </p>

          {/* ===== STATUS HUD ===== */}

          <div className="hud-panel">

            <div className="hud-title">

              SYSTEM STATUS

            </div>

            {

              HUD_DATA.map((item, index) => (

                <div

                  key={index}

                  className="hud-item"

                >

                  <span>

                    {item.title}

                  </span>

                  <strong>

                    {item.value}

                  </strong>

                </div>

              ))

            }

          </div>

          {/* ===== TERMINAL ===== */}

          <div className="terminal">

            <div className="terminal-header">

              <span className="dot red"></span>

              <span className="dot yellow"></span>

              <span className="dot green"></span>

              <span className="terminal-name">

                brainspark@ai

              </span>

            </div>

            <div className="terminal-body">

              <p>

                system@brainspark:~$

              </p>

              <p className="typing">

                {typingText}

                <span className="cursor">

                  |

                </span>

              </p>

            </div>

          </div>

          {/* ===== FEATURE CARDS ===== */}

          <div className="feature-grid">

            <div className="feature-card">

              <BrainCircuit size={20} />

              <span>

                Neural AI

              </span>

            </div>

            <div className="feature-card">

              <Sparkles size={20} />

              <span>

                AI Images

              </span>

            </div>

            <div className="feature-card">

              <Cpu size={20} />

              <span>

                Automation

              </span>

            </div>

            <div className="feature-card">

              <Zap size={20} />

              <span>

                Fast Processing

              </span>

            </div>

          </div>

        </div>

        {/* ===============================
            PART 6 STARTS HERE
        =============================== */}
                {/* ===============================
            LOGIN CARD
        =============================== */}

        <div
          ref={cardRef}
          className="login-card"
          onMouseMove={handleCardMove}
          onMouseLeave={resetCard}
        >

          {/* ===== Mouse Shine ===== */}

          <div
            ref={shineRef}
            className="mouse-shine"
          ></div>

          <div className="card-glow"></div>

          <div className="glass-border"></div>

          {/* ===== Header ===== */}

          <div className="card-header">

            <ShieldCheck
              size={42}
              className="shield-icon"
            />

            <h2 className="login-title">

              Welcome Back

            </h2>

            <p className="login-subtitle">

              Login securely to access your

              BrainSpark AI workspace.

            </p>

          </div>

          {/* =========================
              EMAIL
          ========================= */}

          <div className="input-group">

            <div className="input-wrapper">

              <Mail className="input-icon" />

              <input
                type="email"
                className="input"
                placeholder=" "
                value={email}
                onChange={(e)=>
                  setEmail(e.target.value)
                }
              />

              <label>

                Email Address

              </label>

              <div className="input-line"></div>

            </div>

          </div>

          {/* =========================
              PASSWORD
          ========================= */}

          <div className="input-group">

            <div className="input-wrapper">

              <Lock className="input-icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="input"
                placeholder=" "
                value={password}
                onChange={(e)=>
                  setPassword(e.target.value)
                }
              />

              <label>

                Password

              </label>

              <div className="input-line"></div>

              <button
                type="button"
                className="eye-btn"
                onClick={()=>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {

                  showPassword

                  ?

                  <EyeOff size={18}/>

                  :

                  <Eye size={18}/>

                }

              </button>

            </div>

          </div>

          {/* ===============================
              PART 7 STARTS HERE
          =============================== */}
                    {/* =========================
              OPTIONS
          ========================= */}

          <div className="login-options">

            <label className="remember">

              <input type="checkbox" />

              <span>Remember Me</span>

            </label>

            <button
              type="button"
              className="forgot-btn"
            >

              Forgot Password?

            </button>

          </div>

          {/* =========================
              LOGIN BUTTON
          ========================= */}

          <button

            className="login-btn"

            onClick={loginUser}

            disabled={loading}

          >

            <span className="btn-shine"></span>

            {

              loading

              ?

              "AUTHENTICATING..."

              :

              "LOGIN"

            }

          </button>

          {/* =========================
              DIVIDER
          ========================= */}

          <div className="divider">

            <span>OR</span>

          </div>

          {/* =========================
              SECURITY FEATURES
          ========================= */}

          <div className="security-panel">

            <div className="security-item">

              🚀 AI Writer

            </div>

            <div className="security-item">

              🎨 AI Image Generator

            </div>

            <div className="security-item">

              🎬 AI Video Studio

            </div>

            <div className="security-item">

              📁 Unlimited Projects

            </div>

          </div>

          {/* =========================
              REGISTER
          ========================= */}

          <div className="register-box">

            <span>

              New to BrainSpark?

            </span>

            <Link

              to="/register"

              className="register-link"

            >

              Create Free Account →

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}