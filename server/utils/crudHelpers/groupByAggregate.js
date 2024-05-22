export const handleGroupByAggregate = async (Model, pipeline) => {
  const data = await Model.aggregate(pipeline);

  if (!data) {
    throw new Error("Not Found");
  }
  return data;
};