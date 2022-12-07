import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Upload from "../components/Upload/Upload";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import DocFileFireBase from "../components/Firebase/DocFileFirebase";
import "../styles/EditChapter.css";

function EditChapter(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [chapterObject, setChapterObject] = useState({
    id: "",
    title: "",
    description: "",
  });
  const [chapterVideo, setChapterVideo] = useState({});
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/api/chapters/byId/${id}`)
        .then((response) => {
          setChapterObject(response.data);
        });

      axios
        .get(`http://localhost:3001/api/videodetails/byChapterId/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setChapterVideo(response.data);
        });

      axios
        .get(`http://localhost:3001/api/documents/${id}`)
        .then((response) => {
          console.log(response.data);
          setDocuments(response.data);
        });
    }
  }, [id]);

  const initialValues = {
    id: chapterObject.id,
    title: chapterObject.title,
    description: chapterObject.description,
  };

  const saveChapterInfo = (data) => {
    axios
      .put("http://localhost:3001/api/chapters/editchapter", data, {
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

  const addDocument = () => {
    console.log("New Document = " + JSON.stringify(newDocument));
    axios
      .post(
        "http://localhost:3001/api/documents",
        {
          name: newDocument,
          firebaseUrl: newDocument,
          ChapterId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log("ERRO= " + response.data.error);
        } else {
          const documentToAdd = {
            name: newDocument,
            firebaseUrl: newDocument,
            id: response.data.id,
          };
          setDocuments([...documents, documentToAdd]);
          setNewDocument("");
        }
      });
  };

  const deleteDocument = (id) => {
    axios
      .delete(`http://localhost:3001/api/documents/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setDocuments(
          documents.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

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
        <div>
          {chapterVideo && chapterVideo.thumbnail_path ? (
            <div className="thumbnailContainer">
              <div className="video-thumbnail">
                <img src={chapterVideo.thumbnail_path} alt="video thubmnail" />
              </div>
              <div className="video-name">
                <label for="video-thumbnail">{chapterVideo.upload_title}</label>
              </div>
            </div>
          ) : (
            <Upload chapterObject={chapterObject} {...props} />
          )}
        </div>
        <div>
          <h4>Documentos do Capitulo</h4>
          <div>
            <div className="editDocumentSpace">
              {documents.map((document, key) => {
                console.log(documents);
                return (
                  <div key={key} className="document">
                    <FilePresentIcon className="filePresent" />
                    <div className="documentTitle">{document.name}</div>
                    <div className="fireBaseComponent">
                      <DocFileFireBase documentId={document.id} {...props} />
                    </div>
                    <div className="documentOptContainer">
                      <div
                        className="documentDeleteButton"
                        onClick={() => deleteDocument(document.id)}
                      >
                        Deletar
                        <ClearIcon />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="addDocumentContainer">
            <input
              type="text"
              placeholder="Nome arquivo"
              value={newDocument}
              autoComplete="off"
              onChange={(event) => {
                setNewDocument(event.target.value);
              }}
            />
            <button onClick={addDocument}>Adicionar Documento</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditChapter;
