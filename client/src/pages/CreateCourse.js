import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/CreateCourse.css";

function CreateCourse() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    level: "",
    category: "",
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/courses", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/"); //aqui vai madar para a ediçao de capitulo
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    description: Yup.string().required(),
    level: Yup.string().required(),
    category: Yup.string().required(),
  });

  return (
    <div>
      <h1>Criar Curso</h1>
      <div className="createCoursePage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Titulo: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourse"
              name="title"
              placeholder="(Ex. Titulo...)"
            />
            <label>Descrição: </label>
            <ErrorMessage name="description" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourse"
              name="description"
              placeholder="(Ex. Descrição...)"
            />
            <label>Nivel: </label>
            <ErrorMessage name="level" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourse"
              name="level"
              placeholder="(Ex. Nivel...)"
            />
            <label>Categoria: </label>
            <ErrorMessage name="category" component="span" />
            <Field
              autoComplete="off"
              id="inputCreateCourse"
              name="category"
              placeholder="(Ex. Categoria...)"
            />
            <button type="submit"> Criar Curso</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateCourse;
