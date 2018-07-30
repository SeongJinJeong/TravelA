const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('html'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'html','index.html'));
});

app.get('/login',function(req,res){
	res.sendFile(path.join(__dirname,'html','login','login.html'));
});
app.post('/login_server',function(req,res){
	var id = req.body.ID;
	var passwd = req.body.PASSWD;

	if(id=="admin" &&passwd=="jsh8689"){
		res.sendFile(path.join(__dirname,'html','index.html'));
	}
	else{
		res.sendFile(path.join(__dirname,'html','login','login.html'));
		alert("LOGIN DENIED");
	}
})

app.get('/register',function(req,res){
	res.sendFile(path.join(__dirname,'html','register','resgister.html'));
});


app.listen(80,function(){
	console.log("Server activated at 80 port!");
});