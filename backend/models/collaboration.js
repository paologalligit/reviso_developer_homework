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
        notNull(value) {
          if (value < 0) {
            throw new Error('Budget required');
          }
        },
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
        notNull(value) {
          if (value < 0) {
            throw new Error('Vat required');
          }
        },
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
        notNull(value) {
          if (value < 0) {
            throw new Error('Penalty required');
          }
        },
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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Start hour required',
        },
      },
    },
    end_hour: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Start hour required',
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
    customer_id: {
      type: DataTypes.INTEGER,
      validate: {
        isValid(value) {
          if (value < 0) {
            throw new Error('Customer required');
          }
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
