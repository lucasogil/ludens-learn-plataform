module.exports = (sequileze, DataTypes) => {
  const VideoDetails = sequileze.define(
    "VideoDetails",
    {
      uploader_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      upload_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ChapterId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  return VideoDetails;
};
