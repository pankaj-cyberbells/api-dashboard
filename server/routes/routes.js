import express from "express";
import middleware from "../verifyAcessToken.js";
import { getAll, getByGroupByAggregate, getBySearchQuery, getCustomer } from "../controller/customer.js";

const router= express.Router();
// authentication routes ====================>
  
  
  
  
  
// customer dynamic data routes ====================>
router.get( "/get/:id", getCustomer);
router.get( "/get-all",  getAll);
router.get( "/group-customer",  getByGroupByAggregate);
// end point will look like -------> GET /api/group-customer?groupBy=movementevent&aggregateFields=invoice,movdate
router.get( "/search-customer",  getBySearchQuery); 
// end point will look like -------> GET /api/search-customer?movdate_range=2023-07-01,2023-07-31

// router.delete( "/book/:id", middleware, deleteBook);



export default router;

