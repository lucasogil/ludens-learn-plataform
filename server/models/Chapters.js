module.exports = (sequileze, DataTypes) => {
  const Chapters = sequileze.define("Chapters", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CourseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Chapters;
};
