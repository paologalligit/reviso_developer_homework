// fare query per prendere i customers per cliente
export default {
  Query: {
    getCustomer: (parent, { id }, { models }) => models.Customer.findOne({ where: { id } }),
    allCustomers: async (parent, args, { models }) => {
      return await models.Customer.findAll();
    },
  },
};
