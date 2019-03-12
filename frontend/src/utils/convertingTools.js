const fromMillisToDate = (d) => {
  const date = new Date(Number(d));

  return date.toDateString();
};

export default fromMillisToDate;
