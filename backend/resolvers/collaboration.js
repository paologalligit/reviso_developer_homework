import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    filteredCollaborations: async (parent, args, { models }) => {
      console.log('the args in backend', args);
      return await models.Collaboration.findAll({
        where: args
      })
    },
    // allCollaborations: () => ,
  },
  Mutation: {
    registerCollaboration: requiresAuth.createResolver(async (parent, args, { models }) => {
      try{
        const collaboration = await models.Collaboration.create(args);

        return {
          ok: true,
          collaboration,
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        }
      }
    }),
  },
}