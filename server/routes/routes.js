import express from "express";
import middleware from "../verifyAcessToken.js";
import { getAll, getByGroupByAggregate, getBySearchQuery, getCustomer, getDataByStore, getSalesRepByStore, getTmbByQuery } from "../controller/customer.js";
import { createTarget, deleteTarget, getTargets, updateTarget } from "../controller/target.js";
import {createAdmin, deleteAdmin, getAllAdmins, login} from "../controller/admin.js";

const router= express.Router();
// authentication routes ====================>
router.post( "/login", login);






// admin routes ====================>  
router.post( "/admin", createAdmin);
// endpoint will look like ----------> post "http://localhost:5000/api/admin" -------> pass data like this {name:"", email:"", password:""}
router.delete( "/admin/:id", deleteAdmin);
router.get( "/all-admin", getAllAdmins);

// customer dynamic data routes ====================>
router.get( "/get/:id", getCustomer);
router.get( "/get-all",  getAll);
router.get( "/sales-rep",  getSalesRepByStore);
router.get( "/group-customer",  getByGroupByAggregate);
// end point will look like -------> GET "http://localhost:5500/api/group-customer?groupBy=name,salelocation&aggregateFields=invoice,promotype&page=1&limit=10"
router.get( "/search-customer",  getBySearchQuery); 
// end point will look like -------> GET "http://localhost:5500/api/search-customer?movdate_range=2023-07-01,2023-07-31"
router.get( "/tmb-count",  getTmbByQuery); 
// end point will look like -------> GET "http://localhost:5500/api/tmb-count?startDate=2024-01-01&endDate=2024-12-31"
router.get( "/data-by-store",  getDataByStore); 
// end point will look like -------> GET "http://localhost:5000/api/data-by-store?salelocation=Warragul&startDate=01/02/24&endDate=16/05/24"


// target data routes ====================>
  
  router.get( "/target", getTargets); 
  router.post( "/target", createTarget); 
  router.patch( "/target/:id", updateTarget); 
  router.delete( "/target/:id", deleteTarget); 
  
  
  // target data routes ====================>




export default router;

