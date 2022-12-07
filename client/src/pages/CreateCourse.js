import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/CreateCourse.css";

const _INSTRUTOR = "INSTRUTOR";

function CreateCourse() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    level: "",
    category: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else if (authState.type !== _INSTRUTOR) {
      navigate("/");
    }
  }, [authState.type]);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/courses", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response);
        navigate(`/editcourse/${response.data.id}`); //aqui vai madar para a ediçao do Curso
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    description: Yup.string().required(),
    level: Yup.string().required(),
    category: Yup.string().required(),
  });

  return (
    <div>
      <div className="createCourseTitlePage">
        <h1>Criar Curso</h1>
      </div>
      <div className="createCoursePage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="createCourseContainer">
            <label>Titulo: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourseTitle"
              name="title"
              placeholder=""
            />
            <label>Descrição: </label>
            <ErrorMessage name="description" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourseDescription"
              name="description"
              placeholder=""
              component="textarea"
              rows="4"
            />
            <label>Nivel: </label>
            <ErrorMessage name="level" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourseLevel"
              name="level"
              placeholder=""
            />
            <label>Categoria: </label>
            <ErrorMessage name="category" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourseCategory"
              name="category"
              placeholder=""
            />
            <button type="submit"> Criar Curso</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateCourse;
