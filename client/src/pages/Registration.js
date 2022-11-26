import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Registration.css";

const _INSTRUTOR = "INSTRUTOR";
const _ALUNO = "ALUNO";

function Registration() {
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    username: "",
    password: "",
    type: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required("Required"),
    username: Yup.string().min(3).max(15).required("Nome do usuario vazio!"),
    password: Yup.string().min(4).max(20).required("Senha esta vazia!"),
  });

  const onSubmit = (data) => {
    verifyInfos(data);
    axios
      .post("http://localhost:3001/api/users", initialValues)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Registro Realizado com Sucesso!");
        }
      });
    navigate("/login");
  };

  function verifyInfos(formData) {
    initialValues.email = formData.email;
    initialValues.username = formData.username;
    initialValues.password = formData.password;
    initialValues.type = formData.type ? _INSTRUTOR : _ALUNO;
  }

  return (
    <div className="registrationPage">
      <h1>Cadastre-se</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="registrationContainer">
          <label>E-mail</label>
          <ErrorMessage name="email" component="span" />
          <Field
            autoComplete="off"
            id="inputRegistration"
            name="email"
            placeholder=""
          />
          <label>Usuario</label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputRegistration"
            name="username"
            placeholder=""
          />
          <label>Senha</label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputRegistration"
            name="password"
            placeholder=""
          />
          <div className="checkBoxInstructorContainer">
            <Field
              className="checkBoxInstructorButton"
              autoComplete="off"
              id="checkBoxInstructor"
              type="checkbox"
              name="type"
              placeholder=""
            />
            <label for="checkBoxInstructor">
              <h6 className="checkBoxInstructorLabel">É Instrutor?</h6>
            </label>
          </div>
          <button type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
