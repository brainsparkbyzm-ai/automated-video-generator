import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../api/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {

    if (!name || !email || !password || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          name,
          email,
          createdAt: new Date().toISOString(),
          plan: "Free",
          credits: 100,
        }
      );

      alert("Account Created Successfully");

      navigate("/dashboard");

    } catch (error) {

      alert(error.message);

    }

    setLoading(false);

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div
        style={{
          width: 430,
          background: "#0F172A",
          padding: 40,
          borderRadius: 20,
          border: "1px solid #1E293B",
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Create Account
        </h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={{
            width:"100%",
            padding:15,
            marginBottom:15,
            borderRadius:10,
            background:"#111827",
            color:"white",
            border:"1px solid #334155"
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:15,
            marginBottom:15,
            borderRadius:10,
            background:"#111827",
            color:"white",
            border:"1px solid #334155"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:15,
            marginBottom:15,
            borderRadius:10,
            background:"#111827",
            color:"white",
            border:"1px solid #334155"
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          style={{
            width:"100%",
            padding:15,
            marginBottom:20,
            borderRadius:10,
            background:"#111827",
            color:"white",
            border:"1px solid #334155"
          }}
        />

        <button
          onClick={registerUser}
          disabled={loading}
          style={{
            width:"100%",
            padding:15,
            background:"#2563EB",
            color:"white",
            border:"none",
            borderRadius:10,
            cursor:"pointer",
            fontWeight:"bold",
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p
          style={{
            color:"#94A3B8",
            marginTop:20,
            textAlign:"center"
          }}
        >
          Already have an account?
          <Link
            to="/"
            style={{
              color:"#3B82F6",
              marginLeft:8,
              textDecoration:"none"
            }}
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}