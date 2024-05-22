import jwt  from "jsonwebtoken";
import { jwtSecrete } from "./server.js";

const middleware=async(req,res,next)=>{
  console.log(req.headers);
  if(!req.headers.authorization){
    res.status(401).send({message:"unauthorized user"});
  }
    const token= req.headers.authorization.split(" ")[0];
    const decoded= jwt.verify(token, jwtSecrete);
    req.userId=decoded.id
    next();
}

export default middleware