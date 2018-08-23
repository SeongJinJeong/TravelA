const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'travela',
	password : '1234',
	database : 'travela',
	multipleStatements: 'true'
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
	res.render('login/login',{
		message : message
	});
	message = null;
});
app.post('/login_server',function(req,res){
	var id = req.body.ID;
	var passwd = req.body.PASSWD;

	conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
		if(err) {
			message = 'Error!';
			res.redirect('/login');
		}
		else if(rows.length > 0){
			user_ID = id;
			user_PASSWD = passwd;
			login_status = 1;
			res.redirect('/');
		}
		else{
			message = 'Invalid Login Info';
			res.redirect('/login');
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
	conn.query('select * from user_idpass where id=?',[req.body.ID],function(err,rows,fields){
		if(err) console.log(err);
		else{
			if(rows.length >0){
				message = 'ID is already exist'
				res.redirect('/register');
			}
			else{
				conn.query('insert into user_idpass(id,pass) values(?,?)',[req.body.ID,req.body.PASSWD],function(err,rows,fields){
					if(err) console.log(err);
					else{
						res.redirect('/');
					}
				});
			}
		}
	});
});

//===================

//Menu Page 
var menu = require('./router/menu');
app.use('/menu',menu);

//===================
app.listen(800,function(){
	console.log("Server activated at 800 port!");
});


//conn.end();