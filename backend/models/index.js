import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.TEST_DB || 'freelancerdb', 'paologio', 'metropolis', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import('./user'),
  Customer: sequelize.import('./customer'),
  Collaboration: sequelize.import('./collaboration'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
