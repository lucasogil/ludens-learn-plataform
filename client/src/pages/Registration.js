import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/Registration.css";

function Registration() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Nome do usuario vazio!"),
    password: Yup.string().min(4).max(20).required("Senha esta vazia!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/users", data).then(() => {
      console.log(data);
    });
    alert("Registro Realizado com Sucesso!");
    navigate("/login");
  };

  return (
    <div>
      <h1>Cadastre-se</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="registrationContainer">
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
          <button type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
