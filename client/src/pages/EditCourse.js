import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/EditCourse.css";

function CreateCourse() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [courseObject, setCourseObject] = useState({
    id: "",
    title: "",
    description: "",
    level: "",
    category: "",
  });
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/api/courses/byId/${id}`)
        .then((response) => {
          setCourseObject(response.data);
        });

      axios.get(`http://localhost:3001/api/chapters/${id}`).then((response) => {
        setChapters(response.data);
      });
    }
  }, []);

  const initialValues = {
    id: courseObject.id,
    title: courseObject.title,
    description: courseObject.description,
    level: courseObject.level,
    category: courseObject.category,
  };

  const saveCourseInfo = (data) => {
    axios
      .put("http://localhost:3001/api/courses/editcourse", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Informações Salvas!");
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    description: Yup.string().required(),
    level: Yup.string().required(),
    category: Yup.string().required(),
  });

  const addChapter = () => {
    console.log("New Chapter = " + JSON.stringify(newChapter));
    axios
      .post(
        "http://localhost:3001/api/chapters",
        {
          title: newChapter,
          description: newChapter,
          CourseId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const chapterToAdd = {
            title: newChapter,
            description: newChapter,
            id: response.data.id,
          };
          setChapters([...chapters, chapterToAdd]);
          setNewChapter("");
        }
      });
  };

  const deleteChapter = (id) => {
    axios
      .delete(`http://localhost:3001/api/chapters/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setChapters(
          chapters.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div>
      <h1>Editar Curso</h1>
      <div className="editCourseSpace">
        <Formik
          initialValues={initialValues}
          onSubmit={saveCourseInfo}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form className="editCourseContainer">
            <label>Titulo: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseTitle"
              name="title"
              placeholder="(Ex. Titulo...)"
            />
            <label>Descrição: </label>
            <ErrorMessage name="description" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseDescription"
              name="description"
              placeholder="(Ex. Descrição...)"
              component="textarea"
              rows="4"
            />
            <label>Nivel: </label>
            <ErrorMessage name="level" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseLevel"
              name="level"
              placeholder="(Ex. Nivel...)"
            />
            <label>Categoria: </label>
            <ErrorMessage name="category" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseCategory"
              name="category"
              placeholder="(Ex. Categoria...)"
            />
            <button type="submit"> Salvar Informações </button>
          </Form>
        </Formik>
      </div>
      <div className="editChapterSpace">
        <div className="listOfChapters">
          {chapters.map((chapter, key) => {
            console.log(chapters);
            return (
              <div key={key} className="chapter">
                <CircleIcon className="chapterCircle" />
                <div
                  className="chapterTitle"
                  onClick={() => navigate(`/chapter/${chapter.id}`)}
                >
                  {chapter.title}
                </div>
                {authState.username === courseObject.instructorName && (
                  <div className="chapterOptContainer">
                    <div
                      className="chapterEditButton"
                      onClick={() => navigate(`/editchapter/${chapter.id}`)}
                    >
                      Editar
                      <EditIcon />
                    </div>
                    <div
                      className="chapterDeleteButton"
                      onClick={() => deleteChapter(chapter.id)}
                    >
                      Deletar
                      <ClearIcon />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="addChapterContainer">
        <input
          type="text"
          placeholder="Nome do Capitulo..."
          value={newChapter}
          autoComplete="off"
          onChange={(event) => {
            setNewChapter(event.target.value);
          }}
        />
        <button onClick={addChapter}>Adicionar Capitulo</button>
      </div>
    </div>
  );
}

export default CreateCourse;
