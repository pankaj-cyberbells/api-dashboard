import express from "express";
import middleware from "../verifyAcessToken.js";
import { getAll, getByGroupByAggregate, getBySearchQuery, getCustomer } from "../controller/customer.js";

const router= express.Router();
// authentication routes ====================>
  
  
  
  
  
// customer dynamic data routes ====================>
router.get( "/get/:id", getCustomer);
router.get( "/get-all",  getAll);
router.get( "/group-customer",  getByGroupByAggregate);
// end point will look like -------> GET "http://localhost:5500/api/group-customer?groupBy=name,salelocation&aggregateFields=invoice,promotype&page=1&limit=10"
router.get( "/search-customer",  getBySearchQuery); 
// end point will look like -------> GET "http://localhost:5500/api/search-customer?movdate_range=2023-07-01,2023-07-31"



export default router;

