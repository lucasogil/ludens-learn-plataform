module.exports = (sequileze, DataTypes) => {
  const Likes = sequileze.define(
    "Likes",
    {},
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  return Likes;
};
