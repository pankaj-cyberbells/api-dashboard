export const buildAggregationOperations = (fields) =>
  fields.reduce((acc, field) => ({ ...acc, [field]: { $push: `$${field}` } }), {});



export const formatDate = (date) => {
  const [month, day, year] = date.split('/');
  return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year.padStart(2, '0')}`;
};