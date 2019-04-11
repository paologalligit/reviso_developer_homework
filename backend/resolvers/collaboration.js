/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import Sequelize from 'sequelize';

import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';
import HoursConstraintError from '../hours-constraint-error';

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;

export default {
  Query: {
    filteredCollaborations: async (parent, args, { models }) => {
      console.log('the args in backend', args);
      const {
        user_id, customer_id, name, budget, vat, penalty, date, start_hour, end_hour,
      } = args;
      return await models.Collaboration.findAll({
        where: {
          user_id,
          customer_id: customer_id < 0 ? { [Op.gt]: 0 } : customer_id,
          name: {
            [Op.iLike]: name || '%',
          },
          budget: budget ? { [Op.eq]: args.budget } : { [Op.gt]: 0 },
          vat: vat ? { [Op.eq]: vat } : { [Op.gt]: 0 },
          penalty: penalty ? { [Op.eq]: penalty } : { [Op.gt]: 0 },
          date: { [Op.gte]: date || 0 },
          start_hour: { [Op.gte]: start_hour || '00:00:00' },
          end_hour: { [Op.lte]: end_hour || '23:59:59' },
        },
      });
    },
  },
  Mutation: {
    registerCollaboration: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        // console.log('the args: ', args);
        const { start_hour, end_hour } = args;
        console.log('start: ', start_hour, ' and end: ', end_hour);
        if (start_hour > end_hour) {
          throw new HoursConstraintError({
            path: 'registerWork',
            message: 'Start hour cannot be greater than end hour',
            fields: [start_hour, end_hour],
          });
        }
        const collaboration = await models.Collaboration.create(args);

        return {
          ok: true,
          collaboration,
        };
      } catch (err) {
        // console.log('the err: ', err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
    sentInvoice: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
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
    }),
  },
};
