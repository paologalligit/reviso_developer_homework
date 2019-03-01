export default (sequelize, DataTypes) => {
  const Collaboration = sequelize.define(
    'collaboration',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date format'
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            args: true,
            msg: 'Invalid number'
          },
        },
      },
      budget: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: 'Invalid amount',
          },
        },
      },
      payment: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: {
            args: true,
            msg: 'Invalid amount',
          },
        },
      },
      vat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: 'Invalid amount',
          },
        },
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: 'Invalid date format'
          },
        },
      },
      settled: {
        type: DataTypes.BOOLEAN,
      },
      delay: {
        type: DataTypes.INTEGER,
        validate: {
          isInteger: {
            args: true,
            msg: 'Invalid period of time'
          }
        }
      },
      penalty_per_day: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            args: true,
            msg: 'Invalid amount'
          }
        }
      },
    },
  );

  Collaboration.associate = (models) => {
    Collaboration.hasMany(models.User);
    Collaboration.hasMany(models.Customer);
  };
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
  return Collaboration;
};