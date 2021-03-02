const router = require("express").Router();
const csv=require('csvtojson');


router.get("/marketprice",async (req,res)=>{
  const csvFilePath=process.env.MARKET_PRICE_PATH
  const jsonArray=await csv().fromFile(csvFilePath);
  res.send(jsonArray)

})
module.exports= router
