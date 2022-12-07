module.exports = (sequileze, DataTypes) => {
  const Chapters = sequileze.define(
    "Chapters",
    {
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
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  Chapters.associate = (models) => {
    Chapters.hasOne(models.VideoDetails, {
      onDelete: "cascade",
    });
  };

  Chapters.associate = (models) => {
    Chapters.hasMany(models.Documents, {
      onDelete: "cascade",
    });
  };

  return Chapters;
};
