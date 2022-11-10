import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
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
        {!authState.status ? (
          <>
            <NavLink to="/login"> Login</NavLink>
            <NavLink to="/registration"> Registration</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/">Home Page</NavLink>
            <NavLink to="/feed">Feed Social</NavLink>
            <NavLink to="/createcourse"> Criar um Curso</NavLink>
            <NavLink to="/upload"> Upload</NavLink>
            <NavLink to="/dashboard"> Dashboard</NavLink>
          </>
        )}
      </div>
      <div className="loggedInContainer">
        <NavLink to={`/profile/${authState.id}`}>
          <h2>{authState.username} </h2>
        </NavLink>
        {authState.status && (
          <button onClick={routeChangeLogout}> Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
