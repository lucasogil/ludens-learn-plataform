import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/ludens-logo.png";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function NavbarSticky() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const routeChangeLogout = () => {
    let path = `/logout`;
    navigate(path);
  };

  return (
    <Navbar className="navbar" sticky="top">
      <div className="links">
        <img src={Logo} onClick={() => window.open("/", "_self")} />
        {!authState.status ? (
          <>
            <NavLink to="/login"> Login</NavLink>
            <NavLink to="/registration"> Cadastro</NavLink>
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
          <h4>{authState.username}</h4>
        </NavLink>
        {authState.status && (
          <button onClick={routeChangeLogout}> Logout</button>
        )}
      </div>
    </Navbar>
  );
}

export default NavbarSticky;
