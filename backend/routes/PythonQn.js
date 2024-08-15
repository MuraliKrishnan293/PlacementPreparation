const express = require("express");
const router = express.Router();
const fetch = require("fetch");
const mcq = require("../models/Mcq");



router.get("/pythonmcq", async(req,res)=>{
    try{
        const items = await mcq.find();
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching data"});
    }
});

module.exports = router;