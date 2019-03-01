import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid name'
          },
        },
      },
      surname: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid name'
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date format'
          }
        },
      },
      country: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid country'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, 100],
            msg: 'The password needs to be at least 5 characters long',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          // eslint-disable-next-line no-param-reassign
          user.password = hashedPassword;
        },
      },
    },
  );

  /*
  User.associate = (models) => {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
    // N:M
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };
  */

  return User;
};