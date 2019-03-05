// fare query per prendere i customers per cliente
import formatErrors from "../formatErrors";

export default {
  Query: {
    getCustomer: (parent, { id }, { models }) => models.Customer.findOne({ where: { id } }),
    allCustomers: async (parent, args, { models }) => {
      return await models.Customer.findAll();
    },
  },
  Mutation: {
    registerCustomer: async (parent, args, { models }) => {
      try {
        const customer = await models.Customer.create(args);

        return {
          ok: true,
          customer,
        };
      } catch (err) {
        // console.log('catch in resolver: ', formatErrors(err, models));
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
