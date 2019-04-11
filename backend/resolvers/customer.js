import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
  Query: {
    getCustomer: (parent, { id }, { models }) => models.Customer.findOne({ where: { id } }),
    getCustomersPerUser: (parent, { user_id }, { models }) => models.Customer.findAll({ where: { user_id } }),
    allCustomers: async (parent, args, { models }) => await models.Customer.findAll(),
  },
  Mutation: {
    registerCustomer: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        const customer = await models.Customer.create(args);
        console.log('the customer: ', customer);

        return {
          ok: true,
          customer,
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
