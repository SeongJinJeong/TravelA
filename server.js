const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const cookieParser = require('cookie-parser');

const conn = mysql.createConnection({
	host : 'localhost',
	user : 'travela',
	password : '1234',
	database : 'travela',
	multipleStatements: 'true'
});
conn.connect();

const app = express();
var user_info = {
	id : '',
	pwd : '',
	name : '',
};
var message;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('@RJSJKLQQ%@#$%J234'));

//================

//MAIN PAGE

app.get('/',function(req,res){
	res.cookie('before_page','/',{signed:true});
	res.render('index',{
		status : req.signedCookies.login_status
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
	conn.query('select * from user_info where id = ? and pass = ?',[req.body.ID,req.body.PASSWD],function(err,rows,fields){
		if(err) {
			message = 'Error!';
			res.redirect('/login');
		}
		else if(rows.length > 0){

			conn.query('select * from user_info where id = ?',[req.body.ID],function(err,rows,fields){
				user_info.id = rows[0].id;
				user_info.pwd = rows[0].pass;
				user_info.name = rows[0].name;
			});
			res.cookie('login_status',1,{signed:true});
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
	res.clearCookie('login_status');

	user_info.id = '';
	user_info.pwd = '';
	user_info.name = '';

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
	conn.query('select * from user_info where id=?',[req.body.ID],function(err,rows,fields){
		if(err) console.log(err);
		else{
			if(rows.length >0){
				message = 'ID is already exist'
				res.redirect('/register');
			}
			else{
				conn.query('insert into user_info(id,pass,name) values(?,?,?)',[req.body.ID,req.body.PASSWD,req.body.NAME],function(err,rows,fields){
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

//MY INFO PAGE
 
app.get('/myinfo',function(req,res){
	res.render('myinfo/myinfo',{
		status : req.signedCookies.login_status,
		id : user_info.id,
		password : user_info.pwd,
		name : user_info.name
	});
});

//==================

//Menu Page 
var menu = require('./router/menu');
app.use('/menu',menu);

//===================

//Write Page

app.get('/write',function(req,res){
	res.render('buttons/write',{
		status : req.signedCookies.login_status,
		menu : "japan",
	});
});

app.post('/writing_server',function(req,res){
	before_page = req.query.before;

	var title = req.body.writing_title;
	var author = req.body.author;
	var contents = req.body.contents;
	var sql = "insert into "+before_page+"(title,author,content) values(?,?,?)" 
	conn.query(sql,[title,author,contents],function(err,rows,fields){
		if(err) console.log(err);
		else {
			res.redirect('/');
		}
	})
})

//===================
app.listen(800,function(){
	console.log("Server activated at 800 port!");
});

//==================



//conn.end();