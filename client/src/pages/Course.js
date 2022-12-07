import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "../styles/Course.css";

const _INSTRUTOR = "INSTRUTOR";
const _ALUNO = "ALUNO";

function Course() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [courseObject, setCourseObject] = useState({});
  const [matriculated, setMatriculated] = useState(false);
  const [chapters, setChapters] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`http://localhost:3001/api/courses/byId/${id}`)
      .then((response) => {
        setCourseObject(response.data);
        setMatriculated(isMatriculated(response.data.Matriculations));
      });

    axios.get(`http://localhost:3001/api/chapters/${id}`).then((response) => {
      setChapters(response.data);
    });
  }, []);

  const matriculationCourse = (courseId) => {
    axios
      .post(
        "http://localhost:3001/api/matriculations",
        { CourseId: courseId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.matriculated) {
          setMatriculated(true);
        } else {
          setMatriculated(false);
        }
      });
  };

  function isMatriculated(matriculationList) {
    let ret = false;
    matriculationList.map((value) => {
      if (value.UserId == authState.id) {
        ret = true;
      }
    });
    return ret;
  }

  const routeChangeLogout = (id) => {
    if (
      (authState.type === _ALUNO && matriculated) ||
      (authState.type === _INSTRUTOR &&
        authState.username === courseObject.instructorName)
    ) {
      let path = `/chapter/${id}`;
      navigate(path);
    } else {
      alert("Necessario Realizar Matricula!");
    }
  };

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
              {authState.type === _INSTRUTOR &&
                authState.username === courseObject.instructorName && (
                  <div
                    className="editCourseButton"
                    onClick={() => navigate(`/editcourse/${courseObject.id}`)}
                  >
                    Editar Curso
                    <EditIcon />
                  </div>
                )}
              {authState.type === _ALUNO && (
                <div
                  onClick={() => {
                    matriculationCourse(courseObject.id);
                  }}
                >
                  {matriculated ? (
                    <div className="matriculatedButton">
                      Desmatricular
                      <RemoveCircleIcon />
                    </div>
                  ) : (
                    <div className="unmatriculatedButton">
                      Matricular-se
                      <AddCircleIcon />
                    </div>
                  )}
                </div>
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
                  onClick={() => routeChangeLogout(chapter.id)}
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
