const express = require('express')
const app = express()
const db = require('./config/mongoose-connection')
const cookieParser = require('cookie-parser')
const path = require('path')
const ownersRouters = require('./routes/ownersRouters')
const usersRouter = require('./routes/usersRouter')
const productRouter = require('./routes/productsRouter')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));


app.get('/',(req,res)=>{
    res.send("hello")
})


app.use('/owner',ownersRouters)
app.use('/users',usersRouter)
app.use('/products',productRouter)









app.listen(3000,()=>{
    console.log("Serving on port 3000")
})
