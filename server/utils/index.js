export const buildAggregationOperations = (fields) => {
  const operations = {};

  fields.forEach(field => {
    operations[field] = {
      $push: `$${field}`
    };
  });

  return operations;
};