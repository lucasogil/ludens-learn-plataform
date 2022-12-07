import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/CourseCatalog.css";

const _INSTRUTOR = "INSTRUTOR";

function CourseCatalog() {
  const [listOfCourses, setListOfCourses] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/createcourse`;
    navigate(path);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      if (authState.type === _INSTRUTOR) {
        axios
          .get(`http://localhost:3001/api/courses/byUserId/${authState.id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            setListOfCourses(response.data);
          });
        console.log("professor");
      } else {
        axios
          .get("http://localhost:3001/api/courses/", {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then((response) => {
            setListOfCourses(response.data);
          });
        console.log("aluno");
      }
      console.log("authState.type = " + authState.type);
    }
  }, [authState.type]);

  return (
    <div className="courseCatalogPage">
      {authState.type === _INSTRUTOR ? (
        <h1 className="coursePageTitle">Meus Cursos</h1>
      ) : (
        <h1 className="coursePageTitle">Catalogo de Cursos</h1>
      )}
      <div>
        {authState.type === _INSTRUTOR && (
          <div className="flex-container" onClick={routeChange}>
            <h6 className="flex-child">Criar Curso</h6>
            <OpenInNewIcon className="flex-child" />
          </div>
        )}
      </div>
      <div>
        {listOfCourses.map((value, key) => {
          return (
            <div key={key} className="courseCatalogContainer">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => navigate(`/course/${value.id}`)}
              >
                <br /> {value.description} <br />
                <br /> <strong>Categoria:</strong>
                {value.category}
                <br /> <strong>Nivel:</strong>
                {value.level}
              </div>
              <div className="infobar">
                <Link className="profilename">{value.instructorName}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseCatalog;
