import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/Profile.css";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileType, setProfileType] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/basicInfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setProfileType(response.data.type);
      });

    axios
      .get(`http://localhost:3001/api/posts/byUserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);

  return (
    <div className="profilePage">
      <div className="profileInfosContainer">
        <div className="userInfos">
          <h1>{username}</h1>
          <h2>{email}</h2>
          <h4>{profileType}</h4>
        </div>
        {authState.username === username && (
          <button
            className="changeInfosButton"
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Alterar Informações
          </button>
        )}
      </div>
      <div>
        <div className="myPostsTitle">
          <h4> Meus Posts </h4>
        </div>
        <div className="listOfPostsSpace">
          {listOfPosts.map((value, key) => {
            return (
              <div key={key} className="post">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => navigate(`/post/${value.id}`)}
                >
                  {value.postText}
                </div>
                <div className="infobar">
                  <div className="profilename"> {value.username} </div>
                  <div className="buttons">
                    <ThumbUpAltIcon />
                    <label> {value.Likes.length}</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
