import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import axios from "axios";
import "../styles/Chapter.css";

function Chapter(props) {
  let { id } = useParams();
  let navigate = useNavigate();
  const [chapterInfos, setChapterInfos] = useState({});

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
    }
  }, []);

  return (
    <div>
      <div className="videoChapterContainer">
        <div className="videoChapterSpace">
          <h3 className="chapterInfoTitleName">{chapterInfos.title}</h3>
          <VideoPlayer id={id} {...props} />
        </div>
      </div>
      <div className="chapterInfosSpace">
        <div className="chapterInfosContainer">
          <div className="chapterInfoDescription">
            {chapterInfos.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chapter;
