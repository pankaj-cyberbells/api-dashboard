import Customer from "../models/customer.js"
import { handleGet, handleGetAll } from "../utils/crudHelpers/Get.js"
import { handleGroupByAggregate } from "../utils/crudHelpers/groupByAggregate.js";
import { buildAggregationOperations } from "../utils/index.js";


export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 15; 
    const result = await handleGetAll(Customer, {}, page, limit);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getCustomer=async(req,res)=>{
  try {
   const result= await handleGet(Customer, {_id:req.params.id});
   return res.status(200).json({ customer: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getBySearchQuery = async (req, res) => {
  try {
    const query = req.query;

    const searchCriteria = {};

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        searchCriteria[key] = query[key];
      }
    }

    const result= await handleGet(Customer, searchCriteria);
    return res.status(200).json({ customer: result });
  } catch (error) {
    console.error('Error searching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getByGroupByAggregate = async (req, res) => {
  try {
    const { groupBy, aggregateFields, page = 1, limit = 15 } = req.query;

    if (!groupBy) {
      return res.status(400).json({ message: 'groupBy query parameter is required' });
    }

    const groupId = groupBy.split(',').reduce((acc, field) => ({ ...acc, [field]: `$${field}` }), {});
    const aggregationOperations = buildAggregationOperations(aggregateFields ? aggregateFields.split(',') : []);
    aggregationOperations.count = { $sum: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pipeline = [
      { $group: { _id: groupId, ...aggregationOperations } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ];

    const result = await handleGroupByAggregate(Customer, pipeline, groupId, aggregationOperations);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error searching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





