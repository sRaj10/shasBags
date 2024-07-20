const express = require('express')
const router = express.Router();
const userModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const cookieParser=require('cookie-parser')
const {generateToken}= require('../utils/generateToken');
const productModels = require('../models/product-models');
const jwt = require('jsonwebtoken')


router.get('/',(req,res)=>{
    res.send('heyy user here')
})

router.post('/register',async(req,res)=>{
    try{
    
    let {email,fullname,password}=req.body
   let user = await userModel.findOne({email:email})
   if(user) {res.status(401) 
    req.flash("error", "Account already created")
    res.redirect('/')}
    
    // res.status(401).send("Account already created")


    else{


    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt,async function(err, hash) {
        let user = await userModel.create({
            email,fullname,
            password:hash
        })
          let token =   generateToken(user)
        res.cookie('token',token)
        req.flash('success','user created successfully')
      
        res.redirect('/')

    });
});

}
    }
        catch(err){
            res.send(err.message)
        }

});

router.post('/login',async(req,res) => {

    let{email,password}=req.body
    let user = await userModel.findOne({email:email})
    if(!user)
    {   res.status(403)
        req.flash("error","Email or Password Incorrect")
        res.redirect('/')
    }
    else
        bcrypt.compare(password,user.password ,async function (err,result){
           if(result){
          let token =  generateToken(user)
   
            res.cookie("token",token)
           
            let products =await  productModels.find()
            let success = req.flash('success')
            
            res.render('shop',{products,success})
   
           }
           else{
            res.status(403)
            req.flash("error","Email or Password Incorrect")
            res.redirect('/')
           }
        }) 

    
})

module.exports = router;

