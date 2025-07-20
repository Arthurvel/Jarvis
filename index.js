const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const {kafka} = require('kafkajs');

const cors = require('cors');



const Report = require('./src/models/report.model.js');
const SqlMap = require('./src/models/sqlMap.Model.js');
const Dir = require("./src/models/dir.model.js");
const Xss = require('./src/models/xss.model.js');
const Arjun = require('./src/models/arjun.model.js');

// importando as rotas 
const reportRoute = require('./src/routes/report.route.js');
const sqlMapRoute = require('./src/routes/sqlMap.Route.js');
const dirRoute = require("./src/routes/dir.route.js");
const xssRoute = require("./src/routes/xss.route.js");
const arjunRoute = require("./src/routes/arjun.route.js");


const { connectProducer } = require('./src/kafka/producer.js');

const app = express();

//midleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.static('public'));

//routes
app.use('/api/report', reportRoute);
app.use('/api/sqlmap',sqlMapRoute);
app.use('/api/dir', dirRoute);
app.use('/api/xss',xssRoute);
app.use('/api/arjun', arjunRoute);

app.listen(3000, ()=>{
    console.log('server is running');
});

mongoose.connect("mongodb+srv://admin:adm12345@backenddb.f4x4wx1.mongodb.net/Jarvis?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database");
})
.catch((error)=>{
    console.log("Not connected to database: ", error.message);
});

connectProducer();
