export default (value) => {
  const n = parseFloat(value);
  return Number.isNaN(n) ? -1 : n;
};
