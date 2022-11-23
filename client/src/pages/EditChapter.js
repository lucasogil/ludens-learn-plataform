import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Upload from "../components/Upload/Upload";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/EditChapter.css";

function CreateCourse(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [chapterObject, setChapterObject] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/api/chapters/byId/${id}`)
        .then((response) => {
          setChapterObject(response.data);
        });
    }
  }, []);

  const initialValues = {
    id: chapterObject.id,
    title: chapterObject.title,
    description: chapterObject.description,
  };

  const saveChapterInfo = (data) => {
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
  });

  return (
    <div>
      <h1>Editar Capitulo</h1>
      <div className="chapterEditionSpace">
        <Formik
          initialValues={initialValues}
          onSubmit={saveChapterInfo}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form className="editChapterContainer">
            <h4 className="chapterFieldName">Titulo: </h4>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseTitle"
              name="title"
              placeholder="(Ex. Titulo...)"
            />
            <h4 className="chapterFieldName">Descrição: </h4>
            <ErrorMessage name="description" component="span" />
            <Field
              autoComplete="off"
              id="inputEditCourseDescription"
              name="description"
              placeholder="(Ex. Descrição...)"
              component="textarea"
              rows="2"
            />
            <button type="submit"> Salvar </button>
          </Form>
        </Formik>
        <Upload chapterObject={chapterObject} {...props} />
      </div>
    </div>
  );
}

export default CreateCourse;
