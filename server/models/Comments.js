module.exports = (sequileze, DataTypes) => {
  const Comments = sequileze.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};
