import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import videojs from "video.js";
import "./VideoPlayer.css";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/videoList/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        res.data.map((video) => {
          console.log("props = " + JSON.stringify(this.props));
          if (video.upload_title === this.props.params.videoTitle) {
            this.setState(
              {
                loaded: true,
                videoJsOptions: {
                  autoplay: false,
                  controls: true,
                  sources: [
                    {
                      src: video.video_path,
                    },
                  ],
                  fluid: true,
                },
              },
              () => {
                this.player = videojs(
                  this.videoNode,
                  this.state.videoJsOptions,
                  function onPlayerReady() {
                    // console.log('onPlayerReady', this)
                  }
                );
              }
            );
          }
        });
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="row" style={{ width: "100vw" }}>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
          {this.state.loaded ? (
            <div data-vjs-player>
              <video
                ref={(node) => (this.videoNode = node)}
                className="video-js vjs-big-play-centered"
              />
            </div>
          ) : (
            " Loading ... "
          )}
        </div>
      </div>
    );
  }
}

export default withParams(VideoPlayer);
