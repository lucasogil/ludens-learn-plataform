import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "../styles/Feed.css";

function Feed() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  let navigate = useNavigate();

  const routeChangeCreatePost = () => {
    let path = `/createpost`;
    navigate(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/api/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/api/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <main>
      <div className="backgroundContainer">
        <div className="feedPage">
          <div className="feedPageTitle">
            <h1>Feed Social</h1>
          </div>
          <div className="creatPostContainer">
            <div className="addPostButton" onClick={routeChangeCreatePost}>
              <PostAddIcon />
            </div>
          </div>
          <div>
            {listOfPosts.map((value, key) => {
              return (
                <div key={key} className="post">
                  <div className="titlePostCard"> {value.title} </div>
                  <div
                    className="bodyPostCard"
                    onClick={() => navigate(`/post/${value.id}`)}
                  >
                    <text>{value.postText}</text>
                  </div>
                  <div className="infobar">
                    <Link
                      className="profilenamePostCard"
                      to={`/profile/${value.UserId}`}
                    >
                      {value.username}
                    </Link>
                    <div className="buttonsPost">
                      <ThumbUpAltIcon
                        onClick={() => {
                          likeAPost(value.id);
                        }}
                        className={
                          likedPosts.includes(value.id)
                            ? "unlikeBttnPost"
                            : "likeBttnPost"
                        }
                      />
                      <label> {value.Likes.length}</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Feed;
