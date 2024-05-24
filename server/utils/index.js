export const buildAggregationOperations = (fields) =>
  fields.reduce((acc, field) => ({ ...acc, [field]: { $push: `$${field}` } }), {});


export const formatDate = (date) => {
  const [day, month, year] = date.split('/');
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};
