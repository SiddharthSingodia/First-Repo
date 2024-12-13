const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectTodb = require("./db/db");
const userRouter = require("./routes/user.routes"); //import user router
const cookieParser = require("cookie-parser");


connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send('Hello World')
})

app.use('/users', userRouter); 

module.exports = app;