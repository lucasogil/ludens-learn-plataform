const express = require("express");
const app = express();
app.use(express.json());

// It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
// If client made req on localhost:4000, and received res from server which
// has localhost:3000 req will fail. It is always the case with RESTful APIs
// So, we attach headers from servers to client to tell browser that it's OK
const cors = require("cors");
app.use(express.json());
app.use(cors());

// Used to log everything like GET, POST, etc requests
const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require("body-parser");
// extended: true allows to parse extended body with rich data in it
// We will use false only allows simple bodies for urlencoded data
app.use(bodyParser.urlencoded({ extended: false }));
// Extracts json data and makes it easy readable to us
app.use(bodyParser.json());

//Routers
//Course
const courseRouter = require("./routes/Courses");
app.use("/api/courses", courseRouter);
//Chapter
const chapterRouter = require("./routes/Chapters");
app.use("/api/chapters", chapterRouter);
//Post
const postRouter = require("./routes/Posts");
app.use("/api/posts", postRouter);
//Comments
const commentsRouter = require("./routes/Comments");
app.use("/api/comments", commentsRouter);
//Users
const usersRouter = require("./routes/Users");
app.use("/api/users", usersRouter);
//Likes
const likesRouter = require("./routes/Likes");
app.use("/api/likes", likesRouter);
//Upload
const uploadRouter = require("./routes/Upload");
app.use("/api/upload", uploadRouter);
//MediaFolder
const mediaFolderRouter = express.static("media/uploads");
app.use("/api/videos", mediaFolderRouter);
//VideosList
const videoDetailsRouter = require("./routes/VideoDetails");
app.use("/api/videodetails", videoDetailsRouter);

//MySQLModels
const db = require("./models");
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
