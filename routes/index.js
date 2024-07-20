const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const productModel= require('../models/product-models')
const userModel = require('../models/user-model')
const bcrypt = require('bcryptjs')




router.get('/',(req,res)=>{
    let error = req.flash('error');
    let success = req.flash('success')
    res.render("index",{error, loggedin: false,success });

})
    router.get("/shop",isLoggedIn, async(req,res)=>{
        let products = await productModel.find()
        let success = req.flash('success')
        res.render('shop',{products,success}) 
    })
    router.get("/cart",isLoggedIn, async(req,res)=>{
        let user = await userModel
        .findOne({email:req.user.email})
        .populate('cart');
        // console.log(user.cart)
     let cart = user.cart
     let success = req.flash('success')
 
        res.render('cart',{cart,user,success}) 
    })



    router.get('/addtocart/:id',isLoggedIn,async(req,res)=>{
        try{
        let user = await userModel.findOne({ email: req.user.email })
        user.cart.push(req.params.id);
        await user.save();
        req.flash("success",'added to cart')
        res.redirect('/shop')
        }
        catch (error) {
            console.error('Error adding to cart:', error);
            res.status(500).send('Internal Server Error');
        }

    
    })


    router.get('/cart/remove/:productId',isLoggedIn,async(req,res)=>{
        let user = await userModel.findOne({email:req.user.email})
        user.cart.pull(req.params.productId);

        await user.save();
     

        req.flash("success",'removed ')
        res.redirect('/cart')
    })

    
   

   



    router.get('/logout', (req, res) => {
        // Clear the cookie that stores the token
        res.clearCookie('token');
    
        // Optionally, you can also clear other cookies or perform additional cleanup here
    
        res.redirect('/');
    });
        

module.exports = router;
