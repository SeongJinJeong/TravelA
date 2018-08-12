const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'travela',
	password : '1234',
	database : 'travela'
});
conn.connect();

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

	conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
		if(err) console.log(err);
		else{
			res.redierct('/');
		}
	})
})

app.get('/register',function(req,res){
	res.sendFile(path.join(__dirname,'html','register','resgister.html'));
});

conn.end();
app.listen(800,function(){
	console.log("Server activated at 800 port!");
});