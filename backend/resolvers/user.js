import { tryLogin } from '../auth';
import formatErrors from '../formatErrors';

export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    registerUser: async (parent, args, { models }) => {
      console.log('args in resolver: ', args);
      try {
        const user = await models.User.create(args);

        return {
          ok: true,
          user,
        };
      } catch (err) {
        console.log('catch in resolver: ', formatErrors(err, models));
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  }
};
