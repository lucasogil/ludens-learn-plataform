const { spawn } = require("child_process");
const { createWriteStream } = require("fs");

const { VideoDetails } = require("../models");
const port = require("../config/default").port;

//WindowsPath
//const ffmpegPath = "E:/softwares/ffmpeg/bin/ffmpeg.exe";
//MacOsPath
const ffmpegPath = "/usr/local/Cellar/ffmpeg/5.1.2/bin/ffmpeg";
const width = 256;
const height = 144;

const generateThumbnail = (target, title, username, chapterId) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, "");
  let tmpFile = createWriteStream(
    "media/uploads/video_thumbnails/" + title + ".jpg"
  );
  const ffmpeg = spawn(ffmpegPath, [
    "-ss",
    0,
    "-i",
    target,
    "-vf",
    `thumbnail,scale=${width}:${height}`,
    "-qscale:v",
    "2",
    "-frames:v",
    "1",
    "-f",
    "image2",
    "-c:v",
    "mjpeg",
    "pipe:1",
  ]);
  ffmpeg.stdout.pipe(tmpFile);
  console.log(chapterId);
  const videoDetails = new VideoDetails({
    ChapterId: chapterId,
    uploader_name: username,
    upload_title: title,
    video_path: target,
    thumbnail_path:
      "http://localhost:" +
      port +
      "/api/videos/video_thumbnails/" +
      encodeURIComponent(title + ".jpg"),
  });
  videoDetails
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  generateThumbnail: generateThumbnail,
};
