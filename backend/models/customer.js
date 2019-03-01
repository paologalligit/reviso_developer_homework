export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'customer',
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
      country: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid country'
          }
        }
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
      specialization: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return Customer;
};