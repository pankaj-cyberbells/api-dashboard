
export const handleGet = async (Model, find) => {
  const data = await Model.findOne(find);
  if (!data) {
    throw new Error("Not Found");
  }
  return data;
};
export const handleGetAll = async (Model, find) => {
  try {
    let data;
    if (find) {
      data = await Model.find(find);
      if (!data) {
        throw new Error('Not found'); 
      }
    } else {
      data = await Model.find();
    }
    return data;
  } catch (error) {
    throw error;
  }
};
