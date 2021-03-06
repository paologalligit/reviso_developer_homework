import express from 'express';
// import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import models from './models';
import { refreshTokens } from './auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const SECRET = '4gh3923h23burn20HU97yg780GDsNkp';
const SECRET2 = 'gfrtyujkHGTYUIL,MNY645678iujh';

const app = express();
app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    models,
    user: req.user,
    SECRET,
    SECRET2,
  }),
});

schema.applyMiddleware({ app });

models.sequelize.sync({ force: false }).then(() => {
  app.listen(8080);
});
