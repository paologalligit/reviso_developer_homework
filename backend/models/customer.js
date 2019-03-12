export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'customer',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid name'
          },
        },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid surname'
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid country'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email',
          },
        },
      },
      specialization: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Invalid city name',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Invalid postal code'
          }
        }
      },
    },
  );

  Customer.associate = (models) => {
    Customer.hasMany(models.Collaboration);
    Customer.belongsTo(models.User);
  };

  return Customer;
};