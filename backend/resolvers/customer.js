// fare query per prendere i customers per cliente
import formatErrors from "../formatErrors";

export default {
  Query: {
    getCustomer: (parent, { id }, { models }) => models.Customer.findOne({ where: { id } }),
    getCustomersPerUser: (parent, { user_id }, { models }) => models.Customer.findAll( { where: { user_id }}),
    allCustomers: async (parent, args, { models }) => {
      return await models.Customer.findAll();
    },
  },
  Mutation: {
    registerCustomer: async (parent, args, { models }) => {
      console.log('the args in register customer: ', args);
      try {
        const customer = await models.Customer.create(args);

        console.log('the customer: ', customer)
        return {
          ok: true,
          customer,
        };
      } catch (err) {
        console.log('catch in resolver: ', formatErrors(err, models));
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
