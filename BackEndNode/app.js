const express = require("express");
const app =  express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv/config')

app.use(cors())
app.use(bodyParser.json());


const customerRoute =  require("./routes/customer")
app.use('/customer', customerRoute);


app.get('/', (req, res) => {
    res.send("We are on new  home");
});


const DB_URL = process.env.DB_CONNECTION;

mongoose.connect (DB_URL ,
    {useNewUrlParser : true},
    () => console.log('Connectd to DB')
);

app.listen(3000);




