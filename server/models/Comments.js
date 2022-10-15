module.exports = (sequileze, DataTypes) => {
  const Comments = sequileze.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};