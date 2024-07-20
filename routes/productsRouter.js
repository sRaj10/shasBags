const express = require('express')
const router = express.Router();
const upload = require('../config/multer-config')
const productModel = require('../models/product-models')


router.post('/create', upload.single("image"), async (req,res)=>{
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const image = req.file;

    if (!image) {
        req.flash('error', 'Provide an image');
        return res.status(400).redirect('/owner/admin');
    }

    let product = await productModel.create({
        image: image.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });

    req.flash('success', 'Product created');
    res.redirect('/owner/admin');
}
catch (error) {
  console.error('Error creating product:', error);
  req.flash('error', 'An error occurred');
  res.status(500).redirect('/owner/admin');
}

})

module.exports = router;