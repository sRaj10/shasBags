const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owner-model')



router.get('/admin',(req,res)=>{
    let success = req.flash("success")
    let error = req.flash("error")
    res.render('createproducts',{success,error})
})

router.post('/create',async(req,res)=>{
    let {fullname,email,password}=req.body

    let owners = await ownerModel.find();
    if(owners.length>0)
    {
        res.status(503).send("permission denied")
    }
    let createdOwner = await ownerModel.create({
                fullname,email,password
    })
    res.status(201).send(createdOwner);
})

module.exports = router;