import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/authApi";
import "./Sign.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords don't match");
    try {
      setLoading(true);
      const { data } = await signUp(form);
      localStorage.setItem("token", data.token);
      navigate("/portfolio");
    } catch (err) {
      const res = err.response?.data;
      setError(Array.isArray(res) ? res.map(i => i.msg).join(", ") : res?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-container">
      <form onSubmit={handleSubmit} className="sign_form">
        <h1>Get Started</h1>
        {error && <p role="alert" style={{ color: "#D32F2F", marginBottom: 14 }}>{error}</p>}
        <input type="text" name="firstname" value={form.firstname} placeholder="Firstname" onChange={handleChange} required />
        <input type="text" name="lastname" value={form.lastname} placeholder="Lastname" onChange={handleChange} required />
        <input type="email" name="email" value={form.email} placeholder="example@gmail.com" onChange={handleChange} required />
        <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange} required minLength={8} />
        <input type="password" name="confirmPassword" value={form.confirmPassword} placeholder="Confirm password" onChange={handleChange} required />
        <button disabled={loading} className="btn">{loading ? "Loading..." : "Sign Up"}</button>
      </form>
    </div>
  );
};
