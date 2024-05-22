import Customer from "../models/customer.js"
import { handleGet, handleGetAll } from "../utils/crudHelpers/Get.js"
import { handleGroupByAggregate } from "../utils/crudHelpers/groupByAggregate.js";
import { buildAggregationOperations } from "../utils/index.js";


export const getAll=async(req,res)=>{
  try {
   const result= await handleGetAll(Customer);
   return res.status(200).json({ customer: result });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

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
    const { groupBy, aggregateFields } = req.query;

    if (!groupBy) {
      return res.status(400).json({ message: 'groupBy query parameter is required' });
    }

    const groupByFields = groupBy.split(',');

    const groupId = {};
    groupByFields.forEach(field => {
      groupId[field] = `$${field}`;
    });

    const aggregateFieldsArray = aggregateFields ? aggregateFields.split(',') : [];
    const aggregationOperations = buildAggregationOperations(aggregateFieldsArray);

    // Add the count operation
    aggregationOperations.count = { $sum: 1 };

    // Build the aggregation pipeline
    const pipeline = [
      {
        $group: {
          _id: groupId,
          ...aggregationOperations
        }
      }
    ];
    const result= await handleGroupByAggregate(Customer, pipeline);
    return res.status(200).json({ customer: result });
  } catch (error) {
    console.error('Error searching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






























// {
// 	"ClickPOSDataFeed": {
// 		"ClickPOSData": [
// 			{
// 				"invoice": "22814",
// 				"movdate": "7/12/2023 2:21:09 PM",
// 				"originalsaledate": "7/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "22896",
// 				"movdate": "13/12/2023 4:11:57 PM",
// 				"originalsaledate": "13/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228194",
// 				"movdate": "18/12/2023 6:21:40 PM",
// 				"originalsaledate": "18/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228198",
// 				"movdate": "19/12/2023 10:01:26 AM",
// 				"originalsaledate": "19/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228213",
// 				"movdate": "19/12/2023 1:54:46 PM",
// 				"originalsaledate": "19/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228222",
// 				"movdate": "19/12/2023 4:01:19 PM",
// 				"originalsaledate": "19/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228282",
// 				"movdate": "22/12/2023 12:28:52 PM",
// 				"originalsaledate": "22/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228315",
// 				"movdate": "23/12/2023 12:13:33 PM",
// 				"originalsaledate": "23/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228569",
// 				"movdate": "9/01/2024 8:29:17 AM",
// 				"originalsaledate": "8/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228589",
// 				"movdate": "8/01/2024 5:50:21 PM",
// 				"originalsaledate": "8/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228667",
// 				"movdate": "12/01/2024 3:04:06 PM",
// 				"originalsaledate": "12/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228783",
// 				"movdate": "20/01/2024 1:39:08 PM",
// 				"originalsaledate": "20/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228846",
// 				"movdate": "25/01/2024 9:13:42 AM",
// 				"originalsaledate": "25/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228846",
// 				"movdate": "25/01/2024 9:15:05 AM",
// 				"originalsaledate": "25/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228916",
// 				"movdate": "30/01/2024 3:59:28 PM",
// 				"originalsaledate": "30/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "228981",
// 				"movdate": "12/02/2024 11:06:05 AM",
// 				"originalsaledate": "2/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281031",
// 				"movdate": "6/02/2024 1:52:54 PM",
// 				"originalsaledate": "6/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281032",
// 				"movdate": "6/02/2024 1:52:39 PM",
// 				"originalsaledate": "6/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281125",
// 				"movdate": "14/02/2024 1:18:14 PM",
// 				"originalsaledate": "14/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281250",
// 				"movdate": "22/02/2024 5:09:47 PM",
// 				"originalsaledate": "22/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281274",
// 				"movdate": "23/02/2024 3:59:03 PM",
// 				"originalsaledate": "23/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281342",
// 				"movdate": "27/02/2024 5:21:42 PM",
// 				"originalsaledate": "27/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281494",
// 				"movdate": "8/03/2024 10:21:08 AM",
// 				"originalsaledate": "8/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281660",
// 				"movdate": "18/03/2024 1:54:33 PM",
// 				"originalsaledate": "18/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281802",
// 				"movdate": "27/03/2024 6:17:14 PM",
// 				"originalsaledate": "27/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281884",
// 				"movdate": "3/04/2024 3:13:04 PM",
// 				"originalsaledate": "3/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281965",
// 				"movdate": "10/04/2024 1:51:26 PM",
// 				"originalsaledate": "9/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2281967",
// 				"movdate": "10/04/2024 1:50:57 PM",
// 				"originalsaledate": "9/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2282425",
// 				"movdate": "10/05/2024 2:00:29 PM",
// 				"originalsaledate": "10/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2282441",
// 				"movdate": "11/05/2024 1:25:04 PM",
// 				"originalsaledate": "11/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "2282499",
// 				"movdate": "17/05/2024 5:26:09 PM",
// 				"originalsaledate": "17/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "8991811",
// 				"movdate": "6/04/2023 3:32:48 PM",
// 				"originalsaledate": "27/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "8991815",
// 				"movdate": "22/03/2024 12:58:03 PM",
// 				"originalsaledate": "22/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "8991816",
// 				"movdate": "22/03/2024 12:49:35 PM",
// 				"originalsaledate": "22/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "8991824",
// 				"movdate": "25/03/2024 10:46:44 AM",
// 				"originalsaledate": "23/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "8991834",
// 				"movdate": "17/04/2024 9:43:31 AM",
// 				"originalsaledate": "24/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820123484",
// 				"movdate": "16/03/2023 11:40:24 AM",
// 				"originalsaledate": "30/01/2022 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820132952",
// 				"movdate": "2/02/2023 1:21:14 PM",
// 				"originalsaledate": "2/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133046",
// 				"movdate": "6/02/2023 1:55:21 PM",
// 				"originalsaledate": "6/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133066",
// 				"movdate": "6/02/2023 5:40:15 PM",
// 				"originalsaledate": "6/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133134",
// 				"movdate": "8/02/2023 5:26:22 PM",
// 				"originalsaledate": "8/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133196",
// 				"movdate": "10/02/2023 3:27:19 PM",
// 				"originalsaledate": "10/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133218",
// 				"movdate": "11/02/2023 12:25:08 PM",
// 				"originalsaledate": "11/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133238",
// 				"movdate": "13/02/2023 10:22:10 AM",
// 				"originalsaledate": "13/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133259",
// 				"movdate": "13/02/2023 3:17:36 PM",
// 				"originalsaledate": "13/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133268",
// 				"movdate": "14/02/2023 9:17:40 AM",
// 				"originalsaledate": "14/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133365",
// 				"movdate": "16/02/2023 4:58:34 PM",
// 				"originalsaledate": "16/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133553",
// 				"movdate": "24/02/2023 9:55:48 AM",
// 				"originalsaledate": "24/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133592",
// 				"movdate": "25/02/2023 1:26:27 PM",
// 				"originalsaledate": "25/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133662",
// 				"movdate": "1/03/2023 11:26:58 AM",
// 				"originalsaledate": "1/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133698",
// 				"movdate": "2/03/2023 11:01:59 AM",
// 				"originalsaledate": "2/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133751",
// 				"movdate": "3/03/2023 1:50:17 PM",
// 				"originalsaledate": "3/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133779",
// 				"movdate": "4/03/2023 10:58:16 AM",
// 				"originalsaledate": "4/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133896",
// 				"movdate": "8/03/2023 5:41:27 PM",
// 				"originalsaledate": "8/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133901",
// 				"movdate": "8/03/2023 5:44:01 PM",
// 				"originalsaledate": "8/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133918",
// 				"movdate": "9/03/2023 1:01:47 PM",
// 				"originalsaledate": "9/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820133996",
// 				"movdate": "14/03/2023 10:30:32 AM",
// 				"originalsaledate": "14/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134005",
// 				"movdate": "20/03/2023 2:58:46 PM",
// 				"originalsaledate": "14/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134042",
// 				"movdate": "15/03/2023 1:23:15 PM",
// 				"originalsaledate": "15/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134129",
// 				"movdate": "17/03/2023 5:58:42 PM",
// 				"originalsaledate": "17/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134138",
// 				"movdate": "17/03/2023 5:52:23 PM",
// 				"originalsaledate": "17/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134182",
// 				"movdate": "21/03/2023 1:20:11 PM",
// 				"originalsaledate": "20/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134291",
// 				"movdate": "24/03/2023 1:15:26 PM",
// 				"originalsaledate": "24/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134299",
// 				"movdate": "24/03/2023 5:14:19 PM",
// 				"originalsaledate": "24/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134300",
// 				"movdate": "24/03/2023 5:09:44 PM",
// 				"originalsaledate": "24/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134309",
// 				"movdate": "25/03/2023 9:30:21 AM",
// 				"originalsaledate": "25/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134318",
// 				"movdate": "25/03/2023 11:51:53 AM",
// 				"originalsaledate": "25/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134733",
// 				"movdate": "12/04/2023 5:28:26 PM",
// 				"originalsaledate": "12/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134784",
// 				"movdate": "14/04/2023 9:43:46 AM",
// 				"originalsaledate": "14/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134797",
// 				"movdate": "14/04/2023 12:53:19 PM",
// 				"originalsaledate": "14/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134915",
// 				"movdate": "19/04/2023 12:29:22 PM",
// 				"originalsaledate": "19/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134937",
// 				"movdate": "20/04/2023 4:03:40 PM",
// 				"originalsaledate": "20/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820134938",
// 				"movdate": "20/04/2023 4:04:09 PM",
// 				"originalsaledate": "20/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135090",
// 				"movdate": "27/04/2023 3:17:33 PM",
// 				"originalsaledate": "27/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135213",
// 				"movdate": "2/05/2023 2:14:42 PM",
// 				"originalsaledate": "2/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135279",
// 				"movdate": "5/05/2023 9:42:36 AM",
// 				"originalsaledate": "5/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135294",
// 				"movdate": "5/05/2023 3:44:52 PM",
// 				"originalsaledate": "5/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135301",
// 				"movdate": "5/05/2023 3:10:19 PM",
// 				"originalsaledate": "5/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135358",
// 				"movdate": "8/05/2023 3:52:25 PM",
// 				"originalsaledate": "8/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135360",
// 				"movdate": "8/05/2023 5:23:18 PM",
// 				"originalsaledate": "8/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135572",
// 				"movdate": "17/05/2023 2:07:19 PM",
// 				"originalsaledate": "17/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135797",
// 				"movdate": "27/05/2023 9:33:39 AM",
// 				"originalsaledate": "27/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135815",
// 				"movdate": "27/05/2023 12:39:06 PM",
// 				"originalsaledate": "27/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135898",
// 				"movdate": "2/06/2023 3:37:10 PM",
// 				"originalsaledate": "31/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820135943",
// 				"movdate": "2/06/2023 10:36:50 AM",
// 				"originalsaledate": "2/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136017",
// 				"movdate": "5/06/2023 1:34:31 PM",
// 				"originalsaledate": "13/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136095",
// 				"movdate": "8/06/2023 8:42:13 AM",
// 				"originalsaledate": "7/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136446",
// 				"movdate": "21/06/2023 4:43:48 PM",
// 				"originalsaledate": "21/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136454",
// 				"movdate": "22/06/2023 4:47:32 PM",
// 				"originalsaledate": "22/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136487",
// 				"movdate": "23/06/2023 1:46:30 PM",
// 				"originalsaledate": "23/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136522",
// 				"movdate": "26/06/2023 9:15:27 AM",
// 				"originalsaledate": "26/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136676",
// 				"movdate": "30/06/2023 5:05:12 PM",
// 				"originalsaledate": "30/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136751",
// 				"movdate": "4/07/2023 3:25:48 PM",
// 				"originalsaledate": "4/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136793",
// 				"movdate": "6/07/2023 3:16:18 PM",
// 				"originalsaledate": "6/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136793",
// 				"movdate": "6/07/2023 3:45:40 PM",
// 				"originalsaledate": "6/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136818",
// 				"movdate": "7/07/2023 3:14:05 PM",
// 				"originalsaledate": "7/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136830",
// 				"movdate": "8/07/2023 10:19:15 AM",
// 				"originalsaledate": "8/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136852",
// 				"movdate": "10/07/2023 12:27:37 PM",
// 				"originalsaledate": "10/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136862",
// 				"movdate": "10/07/2023 4:09:07 PM",
// 				"originalsaledate": "10/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136936",
// 				"movdate": "13/07/2023 4:31:04 PM",
// 				"originalsaledate": "13/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820136989",
// 				"movdate": "17/07/2023 9:51:06 AM",
// 				"originalsaledate": "17/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137100",
// 				"movdate": "21/07/2023 12:17:35 PM",
// 				"originalsaledate": "21/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137127",
// 				"movdate": "22/07/2023 12:01:32 PM",
// 				"originalsaledate": "22/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137144",
// 				"movdate": "24/07/2023 1:49:40 PM",
// 				"originalsaledate": "24/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137190",
// 				"movdate": "26/07/2023 10:08:13 AM",
// 				"originalsaledate": "26/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137191",
// 				"movdate": "26/07/2023 10:59:58 AM",
// 				"originalsaledate": "26/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137207",
// 				"movdate": "26/07/2023 5:18:24 PM",
// 				"originalsaledate": "26/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137286",
// 				"movdate": "29/07/2023 1:10:33 PM",
// 				"originalsaledate": "29/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137308",
// 				"movdate": "31/07/2023 1:50:47 PM",
// 				"originalsaledate": "31/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137345",
// 				"movdate": "1/08/2023 5:00:01 PM",
// 				"originalsaledate": "1/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137346",
// 				"movdate": "1/08/2023 4:07:39 PM",
// 				"originalsaledate": "1/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137346",
// 				"movdate": "1/08/2023 4:11:00 PM",
// 				"originalsaledate": "1/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137347",
// 				"movdate": "1/08/2023 5:00:11 PM",
// 				"originalsaledate": "1/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137382",
// 				"movdate": "3/08/2023 11:04:05 AM",
// 				"originalsaledate": "3/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137401",
// 				"movdate": "3/08/2023 3:08:11 PM",
// 				"originalsaledate": "3/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137473",
// 				"movdate": "7/08/2023 3:35:46 PM",
// 				"originalsaledate": "7/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137474",
// 				"movdate": "7/08/2023 3:35:30 PM",
// 				"originalsaledate": "7/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137491",
// 				"movdate": "8/08/2023 12:43:25 PM",
// 				"originalsaledate": "8/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137495",
// 				"movdate": "8/08/2023 4:05:20 PM",
// 				"originalsaledate": "8/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137551",
// 				"movdate": "11/08/2023 2:29:08 PM",
// 				"originalsaledate": "11/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137552",
// 				"movdate": "11/08/2023 2:28:47 PM",
// 				"originalsaledate": "11/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137611",
// 				"movdate": "15/08/2023 2:48:23 PM",
// 				"originalsaledate": "15/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137655",
// 				"movdate": "16/08/2023 5:22:44 PM",
// 				"originalsaledate": "16/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137656",
// 				"movdate": "16/08/2023 5:22:29 PM",
// 				"originalsaledate": "16/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137702",
// 				"movdate": "18/08/2023 5:31:04 PM",
// 				"originalsaledate": "18/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137738",
// 				"movdate": "21/08/2023 3:40:47 PM",
// 				"originalsaledate": "21/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137767",
// 				"movdate": "22/08/2023 4:46:47 PM",
// 				"originalsaledate": "22/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137829",
// 				"movdate": "24/08/2023 4:23:41 PM",
// 				"originalsaledate": "24/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137911",
// 				"movdate": "29/08/2023 12:44:33 PM",
// 				"originalsaledate": "29/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137913",
// 				"movdate": "29/08/2023 5:21:07 PM",
// 				"originalsaledate": "29/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137929",
// 				"movdate": "30/08/2023 10:09:35 AM",
// 				"originalsaledate": "30/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137931",
// 				"movdate": "30/08/2023 10:09:16 AM",
// 				"originalsaledate": "30/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137957",
// 				"movdate": "31/08/2023 5:06:24 PM",
// 				"originalsaledate": "31/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137960",
// 				"movdate": "31/08/2023 11:00:19 AM",
// 				"originalsaledate": "31/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137963",
// 				"movdate": "31/08/2023 4:29:03 PM",
// 				"originalsaledate": "31/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820137964",
// 				"movdate": "31/08/2023 12:09:19 PM",
// 				"originalsaledate": "31/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138024",
// 				"movdate": "2/09/2023 11:53:02 AM",
// 				"originalsaledate": "2/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138068",
// 				"movdate": "5/09/2023 3:11:29 PM",
// 				"originalsaledate": "5/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138108",
// 				"movdate": "7/09/2023 4:03:11 PM",
// 				"originalsaledate": "7/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138215",
// 				"movdate": "13/09/2023 1:01:07 PM",
// 				"originalsaledate": "13/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138288",
// 				"movdate": "18/09/2023 9:43:18 AM",
// 				"originalsaledate": "18/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138510",
// 				"movdate": "27/09/2023 9:21:27 AM",
// 				"originalsaledate": "27/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138574",
// 				"movdate": "28/09/2023 3:28:36 PM",
// 				"originalsaledate": "28/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138655",
// 				"movdate": "3/10/2023 5:11:18 PM",
// 				"originalsaledate": "3/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138708",
// 				"movdate": "4/10/2023 5:28:01 PM",
// 				"originalsaledate": "4/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138834",
// 				"movdate": "9/10/2023 4:18:13 PM",
// 				"originalsaledate": "9/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138900",
// 				"movdate": "13/10/2023 10:44:53 AM",
// 				"originalsaledate": "11/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820138953",
// 				"movdate": "13/10/2023 9:17:42 AM",
// 				"originalsaledate": "13/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139003",
// 				"movdate": "16/10/2023 9:26:11 AM",
// 				"originalsaledate": "16/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139109",
// 				"movdate": "19/10/2023 10:31:56 AM",
// 				"originalsaledate": "19/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139319",
// 				"movdate": "27/10/2023 4:03:14 PM",
// 				"originalsaledate": "27/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139407",
// 				"movdate": "1/11/2023 2:34:45 PM",
// 				"originalsaledate": "1/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139601",
// 				"movdate": "9/11/2023 3:48:14 PM",
// 				"originalsaledate": "9/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139617",
// 				"movdate": "10/11/2023 11:52:57 AM",
// 				"originalsaledate": "10/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139635",
// 				"movdate": "10/11/2023 4:53:27 PM",
// 				"originalsaledate": "10/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139660",
// 				"movdate": "13/11/2023 5:40:09 PM",
// 				"originalsaledate": "13/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139837",
// 				"movdate": "21/11/2023 5:47:47 PM",
// 				"originalsaledate": "21/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139850",
// 				"movdate": "21/11/2023 2:03:35 PM",
// 				"originalsaledate": "21/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139856",
// 				"movdate": "21/11/2023 4:03:42 PM",
// 				"originalsaledate": "21/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820139953",
// 				"movdate": "24/11/2023 2:19:44 PM",
// 				"originalsaledate": "24/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140072",
// 				"movdate": "29/11/2023 11:47:24 AM",
// 				"originalsaledate": "29/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140090",
// 				"movdate": "29/11/2023 4:57:00 PM",
// 				"originalsaledate": "29/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140098",
// 				"movdate": "30/11/2023 11:50:49 AM",
// 				"originalsaledate": "30/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140121",
// 				"movdate": "30/11/2023 4:08:38 PM",
// 				"originalsaledate": "30/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140123",
// 				"movdate": "30/11/2023 4:11:28 PM",
// 				"originalsaledate": "30/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140149",
// 				"movdate": "1/12/2023 4:42:26 PM",
// 				"originalsaledate": "1/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140255",
// 				"movdate": "7/12/2023 5:42:54 PM",
// 				"originalsaledate": "5/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140269",
// 				"movdate": "6/12/2023 11:03:32 AM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140273",
// 				"movdate": "7/12/2023 5:41:46 PM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140284",
// 				"movdate": "7/12/2023 5:42:13 PM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140440",
// 				"movdate": "12/12/2023 1:06:06 PM",
// 				"originalsaledate": "12/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140652",
// 				"movdate": "20/12/2023 12:25:31 PM",
// 				"originalsaledate": "20/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140671",
// 				"movdate": "29/12/2023 3:31:33 PM",
// 				"originalsaledate": "20/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140674",
// 				"movdate": "21/12/2023 9:24:53 AM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140705",
// 				"movdate": "21/12/2023 3:02:14 PM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140710",
// 				"movdate": "21/12/2023 3:45:14 PM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140736",
// 				"movdate": "22/12/2023 12:55:45 PM",
// 				"originalsaledate": "22/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140811",
// 				"movdate": "26/12/2023 12:17:30 PM",
// 				"originalsaledate": "26/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820140906",
// 				"movdate": "30/12/2023 12:43:07 PM",
// 				"originalsaledate": "30/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141003",
// 				"movdate": "4/01/2024 2:31:38 PM",
// 				"originalsaledate": "4/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141143",
// 				"movdate": "9/01/2024 4:03:37 PM",
// 				"originalsaledate": "9/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141184",
// 				"movdate": "10/01/2024 4:49:39 PM",
// 				"originalsaledate": "10/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141249",
// 				"movdate": "13/01/2024 9:45:05 AM",
// 				"originalsaledate": "13/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141307",
// 				"movdate": "16/01/2024 1:19:32 PM",
// 				"originalsaledate": "16/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141463",
// 				"movdate": "22/01/2024 4:43:40 PM",
// 				"originalsaledate": "22/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141539",
// 				"movdate": "25/01/2024 1:07:31 PM",
// 				"originalsaledate": "25/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141597",
// 				"movdate": "29/01/2024 4:33:53 PM",
// 				"originalsaledate": "29/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141657",
// 				"movdate": "31/01/2024 2:21:33 PM",
// 				"originalsaledate": "31/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141895",
// 				"movdate": "10/02/2024 10:25:28 AM",
// 				"originalsaledate": "9/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820141906",
// 				"movdate": "10/02/2024 1:38:19 PM",
// 				"originalsaledate": "10/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142096",
// 				"movdate": "19/02/2024 1:40:17 PM",
// 				"originalsaledate": "19/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142151",
// 				"movdate": "21/02/2024 3:39:18 PM",
// 				"originalsaledate": "21/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142164",
// 				"movdate": "22/02/2024 10:40:26 AM",
// 				"originalsaledate": "22/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142308",
// 				"movdate": "28/02/2024 5:41:34 PM",
// 				"originalsaledate": "28/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142369",
// 				"movdate": "1/03/2024 1:07:20 PM",
// 				"originalsaledate": "26/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142516",
// 				"movdate": "6/03/2024 2:27:45 PM",
// 				"originalsaledate": "6/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142516",
// 				"movdate": "6/03/2024 2:28:32 PM",
// 				"originalsaledate": "6/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142591",
// 				"movdate": "8/03/2024 3:11:55 PM",
// 				"originalsaledate": "8/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142651",
// 				"movdate": "12/03/2024 4:06:04 PM",
// 				"originalsaledate": "12/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142701",
// 				"movdate": "14/03/2024 3:05:55 PM",
// 				"originalsaledate": "14/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142724",
// 				"movdate": "15/03/2024 11:00:44 AM",
// 				"originalsaledate": "15/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142742",
// 				"movdate": "15/03/2024 4:59:44 PM",
// 				"originalsaledate": "15/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142829",
// 				"movdate": "20/03/2024 1:02:01 PM",
// 				"originalsaledate": "20/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142844",
// 				"movdate": "20/03/2024 4:00:30 PM",
// 				"originalsaledate": "20/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142894",
// 				"movdate": "22/03/2024 11:13:19 AM",
// 				"originalsaledate": "22/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142917",
// 				"movdate": "22/03/2024 5:27:34 PM",
// 				"originalsaledate": "22/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820142929",
// 				"movdate": "23/03/2024 12:51:26 PM",
// 				"originalsaledate": "23/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143108",
// 				"movdate": "3/04/2024 2:36:28 PM",
// 				"originalsaledate": "3/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143158",
// 				"movdate": "5/04/2024 5:07:18 PM",
// 				"originalsaledate": "5/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143194",
// 				"movdate": "8/04/2024 8:46:42 AM",
// 				"originalsaledate": "6/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143273",
// 				"movdate": "10/04/2024 1:42:15 PM",
// 				"originalsaledate": "10/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143413",
// 				"movdate": "16/04/2024 10:07:03 AM",
// 				"originalsaledate": "16/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143455",
// 				"movdate": "17/04/2024 1:26:09 PM",
// 				"originalsaledate": "17/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143524",
// 				"movdate": "19/04/2024 3:14:44 PM",
// 				"originalsaledate": "19/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143560",
// 				"movdate": "22/04/2024 12:03:30 PM",
// 				"originalsaledate": "22/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143594",
// 				"movdate": "24/04/2024 9:41:12 AM",
// 				"originalsaledate": "24/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143614",
// 				"movdate": "24/04/2024 3:58:50 PM",
// 				"originalsaledate": "24/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143749",
// 				"movdate": "2/05/2024 12:00:04 PM",
// 				"originalsaledate": "2/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143753",
// 				"movdate": "2/05/2024 11:14:31 AM",
// 				"originalsaledate": "2/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143788",
// 				"movdate": "3/05/2024 11:59:28 AM",
// 				"originalsaledate": "3/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143818",
// 				"movdate": "4/05/2024 10:30:56 AM",
// 				"originalsaledate": "4/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143825",
// 				"movdate": "4/05/2024 12:24:01 PM",
// 				"originalsaledate": "4/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143895",
// 				"movdate": "8/05/2024 10:12:42 AM",
// 				"originalsaledate": "8/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143932",
// 				"movdate": "9/05/2024 12:03:02 PM",
// 				"originalsaledate": "9/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143947",
// 				"movdate": "10/05/2024 10:13:19 AM",
// 				"originalsaledate": "10/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820143970",
// 				"movdate": "10/05/2024 3:19:23 PM",
// 				"originalsaledate": "10/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "820144144",
// 				"movdate": "18/05/2024 11:11:50 AM",
// 				"originalsaledate": "18/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844127486",
// 				"movdate": "4/04/2023 11:09:21 AM",
// 				"originalsaledate": "29/10/2021 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844132214",
// 				"movdate": "21/03/2023 4:59:38 PM",
// 				"originalsaledate": "3/04/2022 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140323",
// 				"movdate": "1/02/2023 10:14:46 AM",
// 				"originalsaledate": "1/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140327",
// 				"movdate": "10/02/2023 4:27:01 PM",
// 				"originalsaledate": "1/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140347",
// 				"movdate": "1/02/2023 1:41:29 PM",
// 				"originalsaledate": "1/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140375",
// 				"movdate": "2/02/2023 12:52:21 PM",
// 				"originalsaledate": "2/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140398",
// 				"movdate": "3/02/2023 5:03:44 PM",
// 				"originalsaledate": "3/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140479",
// 				"movdate": "6/02/2023 3:34:59 PM",
// 				"originalsaledate": "6/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140491",
// 				"movdate": "6/02/2023 4:41:06 PM",
// 				"originalsaledate": "6/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140494",
// 				"movdate": "6/02/2023 4:52:31 PM",
// 				"originalsaledate": "6/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140572",
// 				"movdate": "9/02/2023 2:29:10 PM",
// 				"originalsaledate": "9/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140614",
// 				"movdate": "10/02/2023 2:45:25 PM",
// 				"originalsaledate": "10/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140659",
// 				"movdate": "11/02/2023 12:24:46 PM",
// 				"originalsaledate": "11/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140674",
// 				"movdate": "13/02/2023 11:33:38 AM",
// 				"originalsaledate": "13/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140698",
// 				"movdate": "13/02/2023 4:47:47 PM",
// 				"originalsaledate": "13/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140713",
// 				"movdate": "14/02/2023 3:34:54 PM",
// 				"originalsaledate": "14/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140761",
// 				"movdate": "15/02/2023 3:22:18 PM",
// 				"originalsaledate": "15/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140820",
// 				"movdate": "9/03/2023 9:20:23 AM",
// 				"originalsaledate": "16/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844140962",
// 				"movdate": "21/02/2023 1:16:44 PM",
// 				"originalsaledate": "21/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141004",
// 				"movdate": "22/02/2023 2:49:50 PM",
// 				"originalsaledate": "22/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141186",
// 				"movdate": "28/02/2023 3:37:09 PM",
// 				"originalsaledate": "28/02/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141219",
// 				"movdate": "1/03/2023 12:02:56 PM",
// 				"originalsaledate": "1/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141367",
// 				"movdate": "6/03/2023 3:54:05 PM",
// 				"originalsaledate": "6/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141383",
// 				"movdate": "15/03/2023 5:55:05 AM",
// 				"originalsaledate": "7/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141416",
// 				"movdate": "8/03/2023 9:23:10 AM",
// 				"originalsaledate": "8/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141487",
// 				"movdate": "15/03/2023 11:00:02 AM",
// 				"originalsaledate": "10/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141548",
// 				"movdate": "14/03/2023 4:11:29 PM",
// 				"originalsaledate": "14/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141553",
// 				"movdate": "14/03/2023 4:48:36 PM",
// 				"originalsaledate": "14/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141574",
// 				"movdate": "15/03/2023 1:15:21 PM",
// 				"originalsaledate": "15/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141605",
// 				"movdate": "16/03/2023 11:57:23 AM",
// 				"originalsaledate": "16/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141610",
// 				"movdate": "16/03/2023 1:46:41 PM",
// 				"originalsaledate": "16/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141621",
// 				"movdate": "17/03/2023 9:28:32 AM",
// 				"originalsaledate": "17/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141641",
// 				"movdate": "17/03/2023 5:41:43 PM",
// 				"originalsaledate": "17/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141654",
// 				"movdate": "22/03/2023 12:27:00 PM",
// 				"originalsaledate": "18/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141737",
// 				"movdate": "21/03/2023 2:31:06 PM",
// 				"originalsaledate": "21/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141774",
// 				"movdate": "22/03/2023 5:53:27 PM",
// 				"originalsaledate": "22/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141790",
// 				"movdate": "23/03/2023 11:46:41 AM",
// 				"originalsaledate": "23/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844141838",
// 				"movdate": "24/03/2023 1:49:35 PM",
// 				"originalsaledate": "24/03/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142149",
// 				"movdate": "4/04/2023 5:23:55 PM",
// 				"originalsaledate": "4/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142474",
// 				"movdate": "18/04/2023 3:38:29 PM",
// 				"originalsaledate": "18/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142481",
// 				"movdate": "19/04/2023 3:41:04 PM",
// 				"originalsaledate": "18/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142514",
// 				"movdate": "20/04/2023 11:05:21 AM",
// 				"originalsaledate": "20/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142572",
// 				"movdate": "21/04/2023 4:21:40 PM",
// 				"originalsaledate": "21/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142687",
// 				"movdate": "27/04/2023 1:13:25 PM",
// 				"originalsaledate": "27/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142751",
// 				"movdate": "29/04/2023 12:07:55 PM",
// 				"originalsaledate": "29/04/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142784",
// 				"movdate": "1/05/2023 3:07:43 PM",
// 				"originalsaledate": "1/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142864",
// 				"movdate": "4/05/2023 10:01:24 AM",
// 				"originalsaledate": "4/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142871",
// 				"movdate": "4/05/2023 10:37:15 AM",
// 				"originalsaledate": "4/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142897",
// 				"movdate": "5/05/2023 12:20:10 PM",
// 				"originalsaledate": "5/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844142958",
// 				"movdate": "8/05/2023 4:30:55 PM",
// 				"originalsaledate": "8/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143087",
// 				"movdate": "13/05/2023 9:29:36 AM",
// 				"originalsaledate": "12/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143106",
// 				"movdate": "13/05/2023 12:48:02 PM",
// 				"originalsaledate": "13/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143136",
// 				"movdate": "16/05/2023 10:06:57 AM",
// 				"originalsaledate": "16/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143185",
// 				"movdate": "17/05/2023 10:28:35 AM",
// 				"originalsaledate": "17/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143201",
// 				"movdate": "17/05/2023 3:40:24 PM",
// 				"originalsaledate": "17/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143203",
// 				"movdate": "18/05/2023 10:07:36 AM",
// 				"originalsaledate": "17/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143217",
// 				"movdate": "18/05/2023 1:26:16 PM",
// 				"originalsaledate": "18/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143383",
// 				"movdate": "24/05/2023 1:11:12 PM",
// 				"originalsaledate": "24/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143567",
// 				"movdate": "30/05/2023 9:59:20 AM",
// 				"originalsaledate": "30/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143596",
// 				"movdate": "31/05/2023 9:12:16 AM",
// 				"originalsaledate": "31/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143610",
// 				"movdate": "31/05/2023 11:51:43 AM",
// 				"originalsaledate": "31/05/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143682",
// 				"movdate": "2/06/2023 12:10:47 PM",
// 				"originalsaledate": "2/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143765",
// 				"movdate": "5/06/2023 5:02:11 PM",
// 				"originalsaledate": "5/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143788",
// 				"movdate": "6/06/2023 3:55:15 PM",
// 				"originalsaledate": "6/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143843",
// 				"movdate": "8/06/2023 9:54:44 AM",
// 				"originalsaledate": "8/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844143999",
// 				"movdate": "13/06/2023 5:35:44 PM",
// 				"originalsaledate": "13/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144151",
// 				"movdate": "17/06/2023 1:58:35 PM",
// 				"originalsaledate": "17/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144374",
// 				"movdate": "26/06/2023 3:47:40 PM",
// 				"originalsaledate": "26/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144470",
// 				"movdate": "29/06/2023 4:01:13 PM",
// 				"originalsaledate": "29/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144494",
// 				"movdate": "30/06/2023 11:37:33 AM",
// 				"originalsaledate": "29/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144500",
// 				"movdate": "30/06/2023 9:49:14 AM",
// 				"originalsaledate": "30/06/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144606",
// 				"movdate": "4/07/2023 10:19:23 AM",
// 				"originalsaledate": "4/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144615",
// 				"movdate": "4/07/2023 11:55:11 AM",
// 				"originalsaledate": "4/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144621",
// 				"movdate": "4/07/2023 5:23:06 PM",
// 				"originalsaledate": "4/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144715",
// 				"movdate": "8/07/2023 11:12:28 AM",
// 				"originalsaledate": "8/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144751",
// 				"movdate": "11/07/2023 11:12:10 AM",
// 				"originalsaledate": "11/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144764",
// 				"movdate": "11/07/2023 1:57:13 PM",
// 				"originalsaledate": "11/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844144993",
// 				"movdate": "20/07/2023 2:16:39 PM",
// 				"originalsaledate": "20/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145054",
// 				"movdate": "24/07/2023 11:02:03 AM",
// 				"originalsaledate": "24/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145103",
// 				"movdate": "25/07/2023 3:05:07 PM",
// 				"originalsaledate": "25/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145213",
// 				"movdate": "31/07/2023 10:54:53 AM",
// 				"originalsaledate": "31/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145226",
// 				"movdate": "31/07/2023 1:22:04 PM",
// 				"originalsaledate": "31/07/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145268",
// 				"movdate": "1/08/2023 1:54:30 PM",
// 				"originalsaledate": "1/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145276",
// 				"movdate": "3/08/2023 10:02:20 AM",
// 				"originalsaledate": "2/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145300",
// 				"movdate": "3/08/2023 4:52:54 PM",
// 				"originalsaledate": "3/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145372",
// 				"movdate": "7/08/2023 10:49:36 AM",
// 				"originalsaledate": "7/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145577",
// 				"movdate": "15/08/2023 3:00:53 PM",
// 				"originalsaledate": "15/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145612",
// 				"movdate": "16/08/2023 5:15:31 PM",
// 				"originalsaledate": "16/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145646",
// 				"movdate": "18/08/2023 12:35:24 PM",
// 				"originalsaledate": "18/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145650",
// 				"movdate": "18/08/2023 4:28:09 PM",
// 				"originalsaledate": "18/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145655",
// 				"movdate": "18/08/2023 3:18:05 PM",
// 				"originalsaledate": "18/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145673",
// 				"movdate": "21/08/2023 10:59:06 AM",
// 				"originalsaledate": "21/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145696",
// 				"movdate": "21/08/2023 2:24:29 PM",
// 				"originalsaledate": "21/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145746",
// 				"movdate": "23/08/2023 2:20:57 PM",
// 				"originalsaledate": "23/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145756",
// 				"movdate": "23/08/2023 4:51:28 PM",
// 				"originalsaledate": "23/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145845",
// 				"movdate": "28/08/2023 12:07:43 PM",
// 				"originalsaledate": "28/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844145921",
// 				"movdate": "31/08/2023 2:46:07 PM",
// 				"originalsaledate": "31/08/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146014",
// 				"movdate": "5/09/2023 11:49:40 AM",
// 				"originalsaledate": "5/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146144",
// 				"movdate": "12/09/2023 11:21:14 AM",
// 				"originalsaledate": "12/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146162",
// 				"movdate": "12/09/2023 3:30:18 PM",
// 				"originalsaledate": "12/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146238",
// 				"movdate": "15/09/2023 4:56:03 PM",
// 				"originalsaledate": "15/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146300",
// 				"movdate": "19/09/2023 12:10:41 PM",
// 				"originalsaledate": "19/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146349",
// 				"movdate": "21/09/2023 12:03:27 PM",
// 				"originalsaledate": "21/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146513",
// 				"movdate": "27/09/2023 10:04:30 AM",
// 				"originalsaledate": "27/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146556",
// 				"movdate": "28/09/2023 1:19:10 PM",
// 				"originalsaledate": "28/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146587",
// 				"movdate": "30/09/2023 10:34:25 AM",
// 				"originalsaledate": "30/09/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146616",
// 				"movdate": "2/10/2023 5:55:32 PM",
// 				"originalsaledate": "2/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146707",
// 				"movdate": "5/10/2023 3:03:47 PM",
// 				"originalsaledate": "5/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146725",
// 				"movdate": "6/10/2023 11:27:24 AM",
// 				"originalsaledate": "6/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146742",
// 				"movdate": "6/10/2023 4:56:45 PM",
// 				"originalsaledate": "6/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146766",
// 				"movdate": "9/10/2023 10:01:50 AM",
// 				"originalsaledate": "9/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146820",
// 				"movdate": "11/10/2023 10:07:35 AM",
// 				"originalsaledate": "11/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146820",
// 				"movdate": "11/10/2023 10:20:48 AM",
// 				"originalsaledate": "11/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146821",
// 				"movdate": "11/10/2023 10:42:13 AM",
// 				"originalsaledate": "11/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146870",
// 				"movdate": "12/10/2023 5:28:51 PM",
// 				"originalsaledate": "12/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146940",
// 				"movdate": "16/10/2023 12:16:23 PM",
// 				"originalsaledate": "16/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844146985",
// 				"movdate": "17/10/2023 3:39:09 PM",
// 				"originalsaledate": "17/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147085",
// 				"movdate": "21/10/2023 12:16:23 PM",
// 				"originalsaledate": "21/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147130",
// 				"movdate": "24/10/2023 12:10:41 PM",
// 				"originalsaledate": "24/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147172",
// 				"movdate": "25/10/2023 4:24:12 PM",
// 				"originalsaledate": "25/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147172",
// 				"movdate": "25/10/2023 4:25:45 PM",
// 				"originalsaledate": "25/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147172",
// 				"movdate": "25/10/2023 4:26:37 PM",
// 				"originalsaledate": "25/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147230",
// 				"movdate": "28/10/2023 11:46:25 AM",
// 				"originalsaledate": "28/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147238",
// 				"movdate": "28/10/2023 1:24:40 PM",
// 				"originalsaledate": "28/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147250",
// 				"movdate": "30/10/2023 3:52:04 PM",
// 				"originalsaledate": "30/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147258",
// 				"movdate": "30/10/2023 1:38:59 PM",
// 				"originalsaledate": "30/10/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147345",
// 				"movdate": "3/11/2023 12:34:47 PM",
// 				"originalsaledate": "3/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147373",
// 				"movdate": "4/11/2023 2:04:27 PM",
// 				"originalsaledate": "4/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147380",
// 				"movdate": "6/11/2023 4:51:57 PM",
// 				"originalsaledate": "6/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147392",
// 				"movdate": "6/11/2023 3:35:13 PM",
// 				"originalsaledate": "6/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147412",
// 				"movdate": "9/11/2023 9:35:22 AM",
// 				"originalsaledate": "8/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147413",
// 				"movdate": "8/11/2023 10:30:36 AM",
// 				"originalsaledate": "8/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147438",
// 				"movdate": "8/11/2023 5:49:35 PM",
// 				"originalsaledate": "8/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147482",
// 				"movdate": "10/11/2023 11:31:28 AM",
// 				"originalsaledate": "10/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147515",
// 				"movdate": "11/11/2023 1:06:12 PM",
// 				"originalsaledate": "11/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147516",
// 				"movdate": "11/11/2023 1:34:58 PM",
// 				"originalsaledate": "11/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147519",
// 				"movdate": "13/11/2023 10:11:52 AM",
// 				"originalsaledate": "13/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147534",
// 				"movdate": "13/11/2023 1:01:51 PM",
// 				"originalsaledate": "13/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147571",
// 				"movdate": "15/11/2023 11:28:34 AM",
// 				"originalsaledate": "15/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147617",
// 				"movdate": "17/11/2023 10:09:37 AM",
// 				"originalsaledate": "17/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147629",
// 				"movdate": "17/11/2023 11:38:36 AM",
// 				"originalsaledate": "17/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147634",
// 				"movdate": "17/11/2023 12:50:19 PM",
// 				"originalsaledate": "17/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147649",
// 				"movdate": "17/11/2023 4:16:24 PM",
// 				"originalsaledate": "17/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147705",
// 				"movdate": "21/11/2023 10:51:30 AM",
// 				"originalsaledate": "21/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147747",
// 				"movdate": "22/11/2023 2:50:10 PM",
// 				"originalsaledate": "22/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147765",
// 				"movdate": "23/11/2023 12:01:54 PM",
// 				"originalsaledate": "23/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147790",
// 				"movdate": "24/11/2023 9:23:40 AM",
// 				"originalsaledate": "23/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147913",
// 				"movdate": "29/11/2023 9:40:45 AM",
// 				"originalsaledate": "29/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147956",
// 				"movdate": "30/11/2023 11:55:07 AM",
// 				"originalsaledate": "30/11/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844147990",
// 				"movdate": "1/12/2023 8:51:09 AM",
// 				"originalsaledate": "1/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148010",
// 				"movdate": "1/12/2023 2:05:13 PM",
// 				"originalsaledate": "1/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148020",
// 				"movdate": "6/12/2023 3:03:44 PM",
// 				"originalsaledate": "2/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148042",
// 				"movdate": "6/12/2023 10:42:10 AM",
// 				"originalsaledate": "2/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148075",
// 				"movdate": "5/12/2023 10:17:42 AM",
// 				"originalsaledate": "4/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148101",
// 				"movdate": "5/12/2023 1:32:07 PM",
// 				"originalsaledate": "5/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148103",
// 				"movdate": "5/12/2023 3:35:43 PM",
// 				"originalsaledate": "5/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148113",
// 				"movdate": "6/12/2023 8:54:48 AM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148122",
// 				"movdate": "6/12/2023 1:28:31 PM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148123",
// 				"movdate": "6/12/2023 12:43:18 PM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148134",
// 				"movdate": "6/12/2023 4:29:38 PM",
// 				"originalsaledate": "6/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148142",
// 				"movdate": "7/12/2023 9:21:37 AM",
// 				"originalsaledate": "7/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148164",
// 				"movdate": "7/12/2023 1:40:22 PM",
// 				"originalsaledate": "7/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148199",
// 				"movdate": "8/12/2023 12:12:30 PM",
// 				"originalsaledate": "8/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148200",
// 				"movdate": "8/12/2023 2:16:17 PM",
// 				"originalsaledate": "8/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148218",
// 				"movdate": "9/12/2023 1:03:40 PM",
// 				"originalsaledate": "9/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148237",
// 				"movdate": "11/12/2023 10:50:50 AM",
// 				"originalsaledate": "11/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148249",
// 				"movdate": "11/12/2023 1:38:21 PM",
// 				"originalsaledate": "11/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148271",
// 				"movdate": "12/12/2023 9:08:54 AM",
// 				"originalsaledate": "12/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148271",
// 				"movdate": "12/12/2023 9:13:31 AM",
// 				"originalsaledate": "12/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148277",
// 				"movdate": "12/12/2023 9:55:24 AM",
// 				"originalsaledate": "12/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148297",
// 				"movdate": "12/12/2023 1:32:58 PM",
// 				"originalsaledate": "12/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148401",
// 				"movdate": "15/12/2023 4:33:15 PM",
// 				"originalsaledate": "15/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148442",
// 				"movdate": "18/12/2023 10:08:04 AM",
// 				"originalsaledate": "18/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148503",
// 				"movdate": "19/12/2023 3:28:33 PM",
// 				"originalsaledate": "19/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148523",
// 				"movdate": "22/12/2023 11:18:35 AM",
// 				"originalsaledate": "20/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148546",
// 				"movdate": "20/12/2023 4:39:20 PM",
// 				"originalsaledate": "20/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148555",
// 				"movdate": "21/12/2023 11:03:50 AM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148568",
// 				"movdate": "21/12/2023 12:04:28 PM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148585",
// 				"movdate": "21/12/2023 1:42:43 PM",
// 				"originalsaledate": "21/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148616",
// 				"movdate": "22/12/2023 1:28:27 PM",
// 				"originalsaledate": "22/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148699",
// 				"movdate": "27/12/2023 4:16:02 PM",
// 				"originalsaledate": "27/12/2023 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148771",
// 				"movdate": "2/01/2024 11:17:11 AM",
// 				"originalsaledate": "2/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148790",
// 				"movdate": "2/01/2024 4:43:20 PM",
// 				"originalsaledate": "2/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148795",
// 				"movdate": "3/01/2024 10:51:26 AM",
// 				"originalsaledate": "3/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844148820",
// 				"movdate": "4/01/2024 11:53:07 AM",
// 				"originalsaledate": "4/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149067",
// 				"movdate": "16/01/2024 10:27:48 AM",
// 				"originalsaledate": "16/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149102",
// 				"movdate": "17/01/2024 5:32:58 PM",
// 				"originalsaledate": "17/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149180",
// 				"movdate": "20/01/2024 12:39:44 PM",
// 				"originalsaledate": "20/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149206",
// 				"movdate": "22/01/2024 4:58:14 PM",
// 				"originalsaledate": "22/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149332",
// 				"movdate": "29/01/2024 5:00:09 PM",
// 				"originalsaledate": "29/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149366",
// 				"movdate": "30/01/2024 4:24:45 PM",
// 				"originalsaledate": "30/01/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149448",
// 				"movdate": "2/02/2024 10:16:17 AM",
// 				"originalsaledate": "2/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149461",
// 				"movdate": "5/02/2024 4:00:33 PM",
// 				"originalsaledate": "2/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149527",
// 				"movdate": "6/02/2024 12:11:25 PM",
// 				"originalsaledate": "6/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149553",
// 				"movdate": "7/02/2024 4:59:18 PM",
// 				"originalsaledate": "7/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149560",
// 				"movdate": "8/02/2024 3:44:18 PM",
// 				"originalsaledate": "7/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149584",
// 				"movdate": "8/02/2024 11:04:01 AM",
// 				"originalsaledate": "8/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149585",
// 				"movdate": "8/02/2024 11:06:55 AM",
// 				"originalsaledate": "8/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149711",
// 				"movdate": "14/02/2024 11:31:16 AM",
// 				"originalsaledate": "14/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149764",
// 				"movdate": "15/02/2024 1:52:39 PM",
// 				"originalsaledate": "14/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149781",
// 				"movdate": "16/02/2024 10:40:44 AM",
// 				"originalsaledate": "13/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149788",
// 				"movdate": "16/02/2024 12:30:51 PM",
// 				"originalsaledate": "16/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149822",
// 				"movdate": "19/02/2024 10:03:01 AM",
// 				"originalsaledate": "19/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149884",
// 				"movdate": "21/02/2024 3:41:48 PM",
// 				"originalsaledate": "21/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844149963",
// 				"movdate": "23/02/2024 1:04:08 PM",
// 				"originalsaledate": "23/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150114",
// 				"movdate": "28/02/2024 4:50:29 PM",
// 				"originalsaledate": "28/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150126",
// 				"movdate": "29/02/2024 5:40:46 PM",
// 				"originalsaledate": "29/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150135",
// 				"movdate": "29/02/2024 1:00:33 PM",
// 				"originalsaledate": "29/02/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150247",
// 				"movdate": "5/03/2024 2:56:10 PM",
// 				"originalsaledate": "5/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150460",
// 				"movdate": "15/03/2024 10:20:27 AM",
// 				"originalsaledate": "15/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150468",
// 				"movdate": "15/03/2024 11:44:48 AM",
// 				"originalsaledate": "15/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150480",
// 				"movdate": "15/03/2024 3:07:58 PM",
// 				"originalsaledate": "15/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150538",
// 				"movdate": "18/03/2024 5:04:09 PM",
// 				"originalsaledate": "18/03/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150788",
// 				"movdate": "2/04/2024 11:59:25 AM",
// 				"originalsaledate": "2/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150848",
// 				"movdate": "3/04/2024 5:26:35 PM",
// 				"originalsaledate": "3/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150849",
// 				"movdate": "4/04/2024 9:52:52 AM",
// 				"originalsaledate": "4/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150849",
// 				"movdate": "4/04/2024 10:00:08 AM",
// 				"originalsaledate": "4/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150878",
// 				"movdate": "5/04/2024 1:06:18 PM",
// 				"originalsaledate": "5/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150886",
// 				"movdate": "5/04/2024 1:31:25 PM",
// 				"originalsaledate": "5/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150978",
// 				"movdate": "10/04/2024 1:35:53 PM",
// 				"originalsaledate": "10/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844150995",
// 				"movdate": "11/04/2024 10:22:39 AM",
// 				"originalsaledate": "11/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151062",
// 				"movdate": "13/04/2024 12:12:36 PM",
// 				"originalsaledate": "13/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151065",
// 				"movdate": "13/04/2024 1:07:01 PM",
// 				"originalsaledate": "13/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151168",
// 				"movdate": "19/04/2024 11:15:12 AM",
// 				"originalsaledate": "19/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151169",
// 				"movdate": "19/04/2024 11:15:02 AM",
// 				"originalsaledate": "19/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151211",
// 				"movdate": "22/04/2024 1:20:15 PM",
// 				"originalsaledate": "22/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151225",
// 				"movdate": "22/04/2024 12:02:09 PM",
// 				"originalsaledate": "22/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151377",
// 				"movdate": "29/04/2024 1:52:31 PM",
// 				"originalsaledate": "29/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151380",
// 				"movdate": "29/04/2024 3:46:06 PM",
// 				"originalsaledate": "29/04/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151490",
// 				"movdate": "6/05/2024 1:51:49 PM",
// 				"originalsaledate": "6/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151495",
// 				"movdate": "6/05/2024 12:31:37 PM",
// 				"originalsaledate": "6/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151504",
// 				"movdate": "6/05/2024 5:25:53 PM",
// 				"originalsaledate": "6/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151507",
// 				"movdate": "7/05/2024 3:06:48 PM",
// 				"originalsaledate": "7/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151519",
// 				"movdate": "7/05/2024 1:42:47 PM",
// 				"originalsaledate": "7/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151530",
// 				"movdate": "8/05/2024 10:47:20 AM",
// 				"originalsaledate": "7/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151553",
// 				"movdate": "9/05/2024 2:13:44 PM",
// 				"originalsaledate": "9/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151558",
// 				"movdate": "10/05/2024 7:37:36 PM",
// 				"originalsaledate": "10/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151560",
// 				"movdate": "10/05/2024 11:18:37 AM",
// 				"originalsaledate": "10/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151669",
// 				"movdate": "14/05/2024 4:40:28 PM",
// 				"originalsaledate": "14/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151696",
// 				"movdate": "15/05/2024 4:01:22 PM",
// 				"originalsaledate": "15/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			},
// 			{
// 				"invoice": "844151727",
// 				"movdate": "17/05/2024 11:07:22 AM",
// 				"originalsaledate": "17/05/2024 12:00:00 AM",
// 				"movementevent": "DELETE",
// 				"linetype": "Header",
// 				"lineitemcode": "0"
// 			}
// 		]
// 	}
// }