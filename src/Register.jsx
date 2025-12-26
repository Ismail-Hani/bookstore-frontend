import { useState } from "react";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
      }

      alert("Account created! You can login.");
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="fullName"
        placeholder="Full name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>

      {error && <div className="error">{error}</div>}

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onLogin}>
          Login
        </button>
      </p>
    </form>
  );
}
