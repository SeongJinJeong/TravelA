const express = require('express');
const app = express();
const route = require('./route.js');

const port = process.env.PORT || 5000;

app.use('/',route);

app.listen(port,()=>{console.log(`Server Starts at ${port} port!!`)});