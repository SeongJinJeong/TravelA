const express = require('express');
const JSAlert = require('js-alert');
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
var login_status;
var user_ID;
var user_PASSWD;
var message;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));

//MAIN PAGE

app.get('/',function(req,res){
	res.render('index',{
		status : login_status
	});
});

//=================

//LOGIN PAGE
app.get('/login',function(req,res){
	res.render('login/login.ejs');
});
app.post('/login_server',function(req,res){
	var id = req.body.ID;
	var passwd = req.body.PASSWD;

	conn.query('select * from user_idpass where id = ?',[id],function(err,rows,fields){
		if(null) res.redirect('/login?wrong=1');
		else{
			conn.query('select * from user_idpass where pass = ?',[passwd],function(err,rows,fields){
				if(err) console.log(err);
				else{
					login_status = 1;
					user_ID = id;
					user_PASSWD = passwd;
					res.redirect('/');
					JSAlert.alert("LOGIN COMPLETE!");
				}
			});
		}
	});
});

//==================

//LOGOUT PAGE 

app.get('/logout',function(req,res){
	login_status = 0;
	user_ID = null;
	user_PASSWD = null;
	res.redirect('/');
})

//=================

//REGISTER PAGE

app.get('/register',function(req,res){
	res.render('register/register',{
		message : message
	});
	message = null;
});
app.post('/register_server',function(req,res){
	conn.query('select exists(select * from user_idpass where id="?")',[req.body.ID],function(err,rows,fields){
		if(err) console.log(err);
		else{
			if(rows == 0){
				var sql = 'insert into user_idpass(id,pass) values(?,?)';
				conn.query(sql,[req.body.ID,req.body.PASSWD],function(err,rows,fields){
					if(err) console.log(err);
					else{
						res.redirect('/');
					}
				});
			}
			else{
				console.log(rows.value);
				message = "Your ID is already exists";
				res.redirect('/register');
			}
		}
	});
});

//===================

app.listen(800,function(){
	console.log("Server activated at 800 port!");
});


//conn.end();