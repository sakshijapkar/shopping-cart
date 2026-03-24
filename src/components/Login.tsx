import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful ✅");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful ✅");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-200">
      <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>

      <input
        type="email"
        placeholder="Email"
        className="p-2 mb-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 mb-4 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Signup
        </button>
      </div>
    </div>
  );
}