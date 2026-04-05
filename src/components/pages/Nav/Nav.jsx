import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <nav className="nav">
      <div className="nav_left">
        <NavLink to="/">Creatium</NavLink>
      </div>
      <div className="nav_right">
        {isAuth ? (
          <>
            <NavLink to="/portfolio" className="btn">Profile</NavLink>
            <button className="sign_in btn" onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/sign-in" className="sign_in btn">Sign In</NavLink>
            <NavLink to="/sign-up" className="sign_up btn">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
