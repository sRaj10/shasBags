const express = require('express')
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('heyy owner here')
})

module.exports = router;