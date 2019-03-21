export default ls => ls.reduce((acc, field) => acc && field !== '', true);
