const express = require('express')
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('heyy user here')
})

module.exports = router;