import Customer from "../models/customer.js";
import { handleGet, handleGetAll } from "../utils/crudHelpers/Get.js";
import { handleGroupByAggregate } from "../utils/crudHelpers/groupByAggregate.js";
import { buildAggregationOperations, formatDate } from "../utils/index.js";

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

export const getCustomer = async (req, res) => {
  try {
    const result = await handleGet(Customer, { _id: req.params.id });
    return res.status(200).json({ customer: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSalesRepByStore = async (req, res) => {
  const { salelocation, startDate, endDate } = req.query;

  if (!salelocation) {
    return res.status(400).json({ message: "Please provide a salelocation" });
  }

  let dateFilter = {};

  if (startDate && endDate) {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    dateFilter = {
      saledate_rep_: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
  }

  try {
    const filter = {
      salelocation: { $regex: new RegExp(salelocation.toLowerCase(), "i") },
      ...dateFilter,
    };

    const salesreps = await Customer.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$salesrep",
        },
      },
      {
        $project: {
          _id: 0,
          salesrep: "$_id",
        },
      },
    ]);

    res.status(200).json(salesreps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBySearchQuery = async (req, res) => {
  try {
    const query = req.query;

    const searchCriteria = {};

    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        searchCriteria[key] = query[key];
      }
    }

    const result = await handleGet(Customer, searchCriteria);
    return res.status(200).json({ customer: result });
  } catch (error) {
    console.error("Error searching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getByGroupByAggregate = async (req, res) => {
  try {
    const { groupBy, aggregateFields, page = 1, limit = 15 } = req.query;

    if (!groupBy) {
      return res
        .status(400)
        .json({ message: "groupBy query parameter is required" });
    }

    const groupId = groupBy
      .split(",")
      .reduce((acc, field) => ({ ...acc, [field]: `$${field}` }), {});
    const aggregationOperations = buildAggregationOperations(
      aggregateFields ? aggregateFields.split(",") : []
    );
    aggregationOperations.count = { $sum: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const pipeline = [
      { $group: { _id: groupId, ...aggregationOperations } },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ];

    const result = await handleGroupByAggregate(
      Customer,
      pipeline,
      groupId,
      aggregationOperations
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error searching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTmbByQuery = async (req, res) => {
  const { field, value, startDate, endDate } = req.query;
  let dateFilter = {};

  if (!field || !value) {
    return res
      .status(400)
      .json({ message: "Please provide both field and value" });
  }

  if (startDate && endDate) {
    dateFilter = { saledate_rep_: { $gte: startDate, $lte: endDate } };
  }

  try {
    const filter = {
      [field]: value,
      ...dateFilter,
    };

    const counts = await Customer.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: {
            salesrep: "$salesrep",
            salelocation: "$salelocation",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          salesrep: "$_id.salesrep",
          salelocation: "$_id.salelocation",
          count: 1,
        },
      },
    ]);

    res.status(200).json(counts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDataByStore = async (req, res) => {
  const { salelocation, startDate, endDate } = req.query;

  if (!salelocation) {
    return res.status(400).json({ message: "Please provide a salelocation" });
  }

  let dateFilter = {};

  if (startDate && endDate) {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    dateFilter = {
      saledate_rep_: { $gte: formattedStartDate, $lte: formattedEndDate },
    };
  }

  try {
    const filter = {
      salelocation: { $regex: new RegExp(salelocation.toLowerCase(), "i") },
      ...dateFilter,
    };
    const salesreps = await Customer.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$salesrep",

          pnncount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$carrier", "Telstra Mobile Voice (Consumer)"] },
                    { $eq: ["$plancat", "MOB-NEW"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          tmbcount: {
            $sum: {
              $cond: [
                { $eq: ["$carrier", "Telstra Mobile Broadband (Consumer)"] },
                1,
                0,
              ],
            },
          },
          outriCount: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$carrier", "Outright Sale"] },
                    { $eq: ["$carrier", "Telstra PrePaid"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          bundelnewcount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$carrier", "Telstra Bundle (Consumer)"] },
                    { $eq: ["$plancat", "BUNDLE-NEW"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          upgrade: {
            $sum: {
              $cond: [
                { $eq: ["$plantype", "Telstra Upgrade and Protect"] },
                1,
                0,
              ],
            },
          },
          dcpcount: {
            $sum: {
              $cond: [
                { $eq: ["$carrier", "Telstra Repayment (Devices)"] },
                1,
                0,
              ],
            },
          },
          gpvalue: {
            $sum: {
              $add: [
                "$commission",
                "$rebate",
                "$bonus1",
                "$bonus2",
                "$adddedamt1",
                "$adddedamt2",
                "$adddedamt3",
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          salesrep: "$_id",
          pnncount: 1,
          tmbcount: 1,
          outriCount: 1,
          bundelnewcount: 1,
          upgrade: 1,
          dcpcount: 1,
          gpvalue: 1,
        },
      },
    ]);

    res.status(200).json(salesreps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
