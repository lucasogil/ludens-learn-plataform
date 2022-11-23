import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/ChangePassword.css";

function ChangePassword() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(4).max(20).required(),
    newPassword: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    console.log(data);
    axios
      .put("http://localhost:3001/api/users/changepassword", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Senha atualizada!");
        }
      });
  };

  return (
    <div>
      <div className="changePassTitlePage">
        <h1>Troca de Senha</h1>
      </div>
      <div className="changePassPage">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="changePassContainer">
            <label>Senha Atual: </label>
            <ErrorMessage name="oldPassword" component="span" />
            <Field
              name="oldPassword"
              id="inputChangePassword"
              type="password"
              placeholder=""
              autoComplete="off"
            />
            <label>Nova Senha: </label>
            <ErrorMessage name="newPassword" component="span" />
            <Field
              name="newPassword"
              type="password"
              id="inputChangePassword"
              placeholder=""
              autoComplete="off"
            />
            <button type="submit"> Trocar Senha </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
