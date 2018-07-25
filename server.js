const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname,'html')));
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'html','index.html'));
});
app.get('/login',(req,res)=>{
	res.sendFile(path.join(__dirname,'html','login.html'));
});

app.listen(800,()=>{
	console.log('Server is Activated!');
});