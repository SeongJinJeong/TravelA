const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('html'));


app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'html','index.html'));
});
app.get('/login',function(req,res){
	res.sendFile(path.join(__dirname,'html','login','login.html'));
});
app.get('/register',function(req,res){
	res.sendFile(path.join(__dirname,'html','register','resgister.html'));
});


app.listen(80,function(){
	console.log("Server activated at 80 port!");
});