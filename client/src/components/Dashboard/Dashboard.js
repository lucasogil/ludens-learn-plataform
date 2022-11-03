import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Dashboard.css";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/api/videoList/", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setVideoList(response.data);
        });
    }
  }, []);

  const videos = videoList.map((video) => {
    return (
      <div
        className="video col-xs-16 col-sm-16 col-md-4 col-lg-6"
        key={video.id}
      >
        <Link to={"/video/" + video.upload_title}>
          <div className="video-thumbnail">
            <img src={video.thumbnail_path} alt="video thubmnail" />
          </div>
        </Link>
        <span className="username">
          <Link to={"/api/videos/" + video.upload_title}>
            {video.uploader_name}
          </Link>
        </span>
        <span className="video-title">
          {video.upload_title.replace(/_/g, " ")}
        </span>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div>
        <div className="container mt-5">
          <h4>Videos</h4>
          <hr className="my-4" />
          <div className="streams row">{videos}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
