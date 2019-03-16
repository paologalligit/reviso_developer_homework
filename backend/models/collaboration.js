export default (sequelize, DataTypes) => {
  const Collaboration = sequelize.define('collaboration', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Invalid Name',
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
    penalty: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Invalid amount',
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: 'Invalid date format',
        },
      },
    },
    start_hour: {
      type: DataTypes.TIME,
    },
    end_hour: {
      type: DataTypes.TIME,
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
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Invalid date format',
        },
      },
    },
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    delay: {
      type: DataTypes.INTEGER,
      validate: {
        isInteger: {
          args: true,
          msg: 'Invalid period of time',
        },
      },
    },
  });

  Collaboration.associate = (models) => {
    Collaboration.belongsTo(models.User);
    Collaboration.belongsTo(models.Customer);
  };

  return Collaboration;
};
