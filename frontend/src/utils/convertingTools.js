const fromMillisToDate = (d) => {
  const date = new Date(Number(d));

  return date.toDateString();
};

const roundDecimal = (amount, precision) => Number(amount.toFixed(precision));

export { fromMillisToDate, roundDecimal };
