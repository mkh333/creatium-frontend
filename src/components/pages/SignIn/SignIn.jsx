import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../api/authApi";
import "../SignUp/Sign.css";

export const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const { data } = await signIn(form);
      localStorage.setItem("token", data.token);
      navigate("/portfolio");
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-container">
      <form onSubmit={handleSubmit} className="sign_form">
        <h1>Welcome back</h1>
        {error && <p role="alert" style={{ color: "#D32F2F", marginBottom: 14 }}>{error}</p>}
        <input type="email" name="email" value={form.email}
          placeholder="example@gmail.com" onChange={handleChange} required />
        <input type="password" name="password" value={form.password}
          placeholder="Password" onChange={handleChange} required minLength={8} />
        <button className="btn" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};
