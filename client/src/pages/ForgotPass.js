import React, { useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/ForgotPass.css";

function ForgotPass() {
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    email: "",
  };

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(/^(?!.*@[^,]*,)/)
      .required("Required"),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3001/api/users/forgot-password", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log("response=" + response.data);
          alert("Email Enviado!");
        }
      });
  };

  return (
    <div className="forgotPassPage">
      <h1>Recuperação de Senha</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="forgotPassContainer">
          <label> Informe um e-mail cadastrado no site </label>
          <ErrorMessage name="email" component="span" />
          <Field
            name="email"
            type="text"
            id="inputForgotPass"
            placeholder=""
            autoComplete="off"
          />
          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgotPass;
