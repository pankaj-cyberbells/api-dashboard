export const buildAggregationOperations = (fields) =>
  fields.reduce((acc, field) => ({ ...acc, [field]: { $push: `$${field}` } }), {});
