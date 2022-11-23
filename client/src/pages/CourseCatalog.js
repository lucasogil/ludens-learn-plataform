import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "../styles/CourseCatalog.css";

function CourseCatalog() {
  const [listOfCourses, setListOfCourses] = useState([]);

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/createcourse`;
    navigate(path);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/api/courses", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfCourses(response.data);
        });
    }
  }, []);

  return (
    <div className="courseCatalogPage">
      <h1 className="coursePageTitle">Cursos</h1>
      <div className="flex-container" onClick={routeChange}>
        <h6 className="flex-child">Criar Curso</h6>
        <OpenInNewIcon className="flex-child" />
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
