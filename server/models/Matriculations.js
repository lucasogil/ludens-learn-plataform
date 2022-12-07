module.exports = (sequileze, DataTypes) => {
  const Matriculations = sequileze.define(
    "Matriculations",
    {},
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  return Matriculations;
};
