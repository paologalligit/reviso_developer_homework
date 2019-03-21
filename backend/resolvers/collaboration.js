/* eslint-disable camelcase */
/* eslint-disable no-return-await */
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    filteredCollaborations: async (parent, args, { models }) => {
      console.log('the args in backend', args);
      return await models.Collaboration.findAll({ where: args });
    },
    // allCollaborations: () => ,
  },
  Mutation: {
    registerCollaboration: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        const collaboration = await models.Collaboration.create(args);

        return {
          ok: true,
          collaboration,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
    sentInvoice: async (parent, args, { models }) => {
      try {
        console.log('the args: ', args);
        const {
          id, sent, user_id, customer_id,
        } = args;

        const response = await models.Collaboration.findOne({
          where: {
            id,
            user_id,
            customer_id,
          },
        });

        const collaboration = await response.update({
          sent,
        });

        return {
          ok: true,
          collaboration,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};

/* 
collaboration {
  dataValues: 
   { id: 5,
     name: 'terzo',
     budget: '8',
     vat: '89',
     penalty: '98',
     date: 2019-01-01T00:00:00.000Z,
     start_hour: '09:30:00',
     end_hour: '10:30:00',
     payment: null,
     due_date: null,
     settled: null,
     delay: null,
     created_at: 2019-03-11T10:13:09.805Z,
     updated_at: 2019-03-11T10:13:09.805Z,
     user_id: 18,
     customer_id: 82 },
  _previousDataValues: 
   { id: 5,
     name: 'terzo',
     budget: '8',
     vat: '89',
     penalty: '98',
*/