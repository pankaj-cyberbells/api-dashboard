import express from "express";
import routes from "./routes/routes.js"
import cors from "cors"
import {connectToDB} from "./db.js"
import { fetchAndStoreData } from "./utils/cron.js";
import cron from "node-cron"
import * as dotenv from "dotenv"
dotenv.config()
const port=process.env.PORT ||5500;
const app=express();



app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
  res.send("<h1>hello from express server </h1>")
});

// Schedule the task to run every morning at 8 AM
cron.schedule('0 8 * * *', fetchAndStoreData);

app.use("/api", routes);

connectToDB().then(()=>{
  app.listen(port, ()=>{
    console.log(`server started at: http://localhost:${port}`)
  })
}).catch((err)=>{
  console.log(err)
})


