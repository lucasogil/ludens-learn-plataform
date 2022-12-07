import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/CreatePost.css";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
  };

  const onSubmit = (data) => {
    console.log("data" + JSON.stringify(data));
    axios
      .post("http://localhost:3001/api/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/feed");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  return (
    <div className="createPostPage">
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="createPostContainer">
            <ErrorMessage name="title" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePostTitle"
              name="title"
              placeholder="Titulo"
            />
            <ErrorMessage name="postText" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePostText"
              name="postText"
              placeholder="Texto"
              component="textarea"
              rows="4"
            />
            <button type="submit"> Postar </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreatePost;
