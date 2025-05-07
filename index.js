const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');

const Report = require('./src/models/report.model.js');


const reportRoute = require('./src/routes/report.route.js');
const sqlmapRoute = require('./src/routes/target.route.js');


const app = express();

//midleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/report', reportRoute);
app.use('/api/sqlmap', sqlmapRoute);

app.listen(3000, ()=>{
    console.log('server is running');
});

app.get('/', (req, res) =>{
    res.send("hello from node api");
});

mongoose.connect("mongodb+srv://admin:adm12345@backenddb.f4x4wx1.mongodb.net/Jarvis?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to database");
})
.catch((error)=>{
    console.log("Not connected to database: ", error.message);
});