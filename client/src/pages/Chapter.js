import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import axios from "axios";
import "../styles/Chapter.css";
import FilePresentIcon from "@mui/icons-material/FilePresent";

function Chapter(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  const [chapterInfos, setChapterInfos] = useState({});
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/api/chapters/byId/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setChapterInfos(response.data);
        });

      axios
        .get(`http://localhost:3001/api/documents/${id}`)
        .then((response) => {
          console.log(response.data);
          setDocuments(response.data);
        });
    }
  }, [id]);

  return (
    <div>
      <div className="videoChapterContainer">
        <div className="videoChapterSpace">
          <h4 className="chapterInfoTitleName">{chapterInfos.title}</h4>
          <VideoPlayer id={id} {...props} />
        </div>
      </div>
      <div className="chapterInfosSpace">
        <div className="chapterInfosContainer">
          <h5 className="chapterInfoDescriptionTitle">Descrição</h5>
          <div className="chapterInfoDescription">
            {chapterInfos.description}
          </div>
        </div>
      </div>
      <div className="documentSpace">
        <h5 className="documentSpaceTitle">Materias da Aula</h5>
        {documents.map((document, key) => {
          console.log(documents);
          return (
            <div key={key} className="document">
              <FilePresentIcon className="filePresent" />
              <div className="documentTitle">{document.name}</div>
              <div className="fireBaseLink">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={document.firebaseUrl}
                  class="btn btn-primary"
                >
                  Baixar Arquivo
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chapter;
