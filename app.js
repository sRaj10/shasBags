const express = require('express')
const app = express()
const db = require('./config/mongoose-connection')
const cookieParser = require('cookie-parser')
const path = require('path')
const multer = require('multer')
const ownersRouters = require('./routes/ownersRouters')
const usersRouter = require('./routes/usersRouter')
const productRouter = require('./routes/productsRouter')
const expressSession = require("express-session")
const flash = require("connect-flash")
const index = require('./routes/index')
var cookies = require("cookie-parser");
require("dotenv").config();


app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")));
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash())
app.use(cookies());




app.use('/',index)
app.use('/owner',ownersRouters)
app.use('/users',usersRouter)
app.use('/products',productRouter)









app.listen(3000)
