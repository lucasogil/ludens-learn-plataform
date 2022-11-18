module.exports = (sequileze, DataTypes) => {
  const Enrollments = sequileze.define(
    "Enrollments",
    {},
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  return Enrollments;
};
