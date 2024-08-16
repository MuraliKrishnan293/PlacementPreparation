const express = require("express");
const router = express.Router();
const fetch = require("fetch");
const mcq = require("../models/Mcq");



router.get("/pythonmcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({pythonqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching Python data"});
    }
});

router.get("/javamcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({javaqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching Java data"});
    }
});

router.get("/cmcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({cqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching C data"});
    }
});

router.get("/csharpmcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({csharpqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching CSharp data"});
    }
});

router.get("/cplusmcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({cplusqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching CPlus data"});
    }
});

router.get("/jsmcq", async(req,res)=>{
    try{
        const items = await mcq.findOne({jsqns: { $exists: true } });
        // console.log(items);
        res.json(items);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching Js data"});
    }
});

module.exports = router;