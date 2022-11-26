module.exports = (sequileze, DataTypes) => {
  const Users = sequileze.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING, //Professor visualisa somente os seus cursos - Caso precise acessar como aluno crie um perfil de aluno
        allowNull: false,
      },
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Courses, {
      onDelete: "cascade",
    });
  };

  return Users;
};
