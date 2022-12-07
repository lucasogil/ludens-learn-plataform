module.exports = (sequileze, DataTypes) => {
  const Documents = sequileze.define(
    "Documents",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firebaseUrl: {
        type: DataTypes.STRING(1234),
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

  return Documents;
};
