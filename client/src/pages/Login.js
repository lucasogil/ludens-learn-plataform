import React, { useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../styles/Login.css";

function Login() {
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/users/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username,
            type: response.data.type,
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };

  const passwordRecovery = () => {
    navigate("/forgotpass");
  };

  return (
    <div className="loginPage">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="loginContainer">
          <label>Usuario</label>
          <ErrorMessage name="username" component="span" />
          <Field
            name="username"
            type="text"
            id="inputLogin"
            placeholder=""
            autoComplete="off"
          />
          <label>Senha</label>
          <ErrorMessage name="password" component="span" />
          <Field
            name="password"
            type="password"
            id="inputLogin"
            placeholder=""
            autoComplete="off"
          />
          <button className="buttonLogin" type="submit">
            Login
          </button>
          <button className="buttonRecoveryPass" onClick={passwordRecovery}>
            Recuperar Senha
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
