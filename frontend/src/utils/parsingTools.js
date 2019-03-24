export default (value) => {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? -1 : n;
};
