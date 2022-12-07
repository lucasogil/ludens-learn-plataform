import React from "react";
import { withRouter } from "../../helpers/withRouter";
import axios from "axios";
import videojs from "video.js";
import "./VideoPlayer.css";

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
      .get("http://localhost:3001/api/videodetails/", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(JSON.stringify(res));
        res.data.map((video) => {
          if (video.ChapterId == this.props.id) {
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
    if (!localStorage.getItem("accessToken"))
      return this.props.navigate("/login");
    return (
      <div className="row" style={{ width: "80vw" }}>
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

export default withRouter(VideoPlayer);
