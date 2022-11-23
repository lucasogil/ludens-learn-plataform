module.exports = (sequileze, DataTypes) => {
  const Courses = sequileze.define(
    "Courses",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  Courses.associate = (models) => {
    Courses.hasMany(models.Chapters, {
      onDelete: "cascade",
    });
  };

  return Courses;
};
