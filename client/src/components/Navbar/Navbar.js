import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/ludens-logo.png";
import "./Navbar.css";

function Navbar() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const routeChangeLogout = () => {
    let path = `/logout`;
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="links">
        <img src={Logo} onClick={() => window.open("/", "_self")} />
        {!authState.status ? (
          <>
            <NavLink to="/login"> Login</NavLink>
            <NavLink to="/registration"> Registration</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/feed">Feed Social</NavLink>
            <NavLink to="/courses">Cursos</NavLink>
          </>
        )}
      </div>
      <div className="loggedInContainer">
        <NavLink to={`/profile/${authState.id}`}>
          <h2>{authState.username}</h2>
        </NavLink>
        {authState.status && (
          <button onClick={routeChangeLogout}> Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
