import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import CircleIcon from "@mui/icons-material/Circle";
import "../styles/Course.css";

function Course() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [courseObject, setCourseObject] = useState({});
  const [chapters, setChapters] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/courses/byId/${id}`)
      .then((response) => {
        setCourseObject(response.data);
      });

    axios.get(`http://localhost:3001/api/chapters/${id}`).then((response) => {
      setChapters(response.data);
    });
  }, []);

  return (
    <div className="coursePage">
      <div className="courseSpace">
        <div className="courseContainer">
          <div className="title">{courseObject.title}</div>
          <div className="body">
            {courseObject.description}
            <br /> <strong>Categoria:</strong>&ensp;
            {courseObject.category}
            <br /> <strong>Nivel:</strong>&ensp;
            {courseObject.level}
          </div>
          <div className="infobar">
            <div className="usernameCourse">
              {" "}
              <strong>Instrutor:</strong>&ensp;
              {courseObject.instructorName}
            </div>
            <div className="courseOptionsContainer">
              {authState.username === courseObject.instructorName && (
                <button
                  className="editCourseButton"
                  onClick={() => navigate(`/editcourse/${courseObject.id}`)}
                >
                  Editar Curso
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="chapterSpace">
        <div className="listOfChapters">
          {chapters.map((chapter, key) => {
            console.log(chapters);
            return (
              <div key={key} className="chapter">
                <div
                  className="titleChapterContainer"
                  onClick={() => navigate(`/chapter/${chapter.id}`)}
                >
                  <CircleIcon className="chapterCircle" />
                  <div className="chapterTitle">{chapter.title}</div>
                </div>
                <div className="chapterDescription">{chapter.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Course;
