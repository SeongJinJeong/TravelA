const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'views/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

const cookieParser = require('cookie-parser');

const conn = mysql.createConnection({
	host : 'localhost',
	user : 'travela',
	password : '1234',
	database : 'travela',
	multipleStatements: 'true'
});
conn.connect();

var user_info = {
	id : '',
	pwd : '',
	name : '',
};
var message;
var write_message;

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('@RJSJKLQQ%@#$%J234'));

//================

//MAIN PAGE

app.get('/',function(req,res){
	conn.query('select * from community where author="admin"',function(err,rows,fields){
		var list = [];
		if(err) console.log(err);
		else{
			for(var i = 0 ; i<rows.length;i++){
		       	list[i] = {title : rows[i].title, author : rows[i].author, 
		       	content : rows[i].content} 
	   		}
			res.render('index',{
				lists : list,
				status : req.signedCookies.login_status,
				admin : req.cookies.admin,
		});
		}
	})
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
			if(rows[0].id == 'admin'){
				res.cookie('admin',1);
			}
			res.cookie('login_status',1,{signed:true});
			res.cookie('user_id',rows[0].id);
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
	res.clearCookie('user_id');
	res.clearCookie('admin');

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

var before_page;

app.get('/write',function(req,res){
	before_page = req.query.before;
	res.render('buttons/write',{
		status : req.signedCookies.login_status,
		menu : req.query.before,
		user_id : user_info.id,
		message : write_message,
	});
	write_message = null;
});

app.post('/writing_server',upload.single('coverimage'),function(req,res){
	var title = req.body.writing_title;
	var author = req.body.author;
	var contents = req.body.contents;
	var user_id = req.body.user_id;
	var coverimage = req.file.originalname;
	var sql = "insert into "+before_page+"(title,author,content,user_id,coverimage) values(?,?,?,?,?)";
	if(user_info.id != 'admin' && author.toLowerCase() === 'admin'){
	    write_message = "You can't use admin NickName!";
	    res.redirect('/write?before='+before_page);
	} 
	else {
	    conn.query(sql,[title,author,contents,user_info.id,coverimage],function(err,rows,fields){
	        if(err) console.log(err);
	        else {
	        	console.log(req.file);
	            res.redirect('/menu/'+before_page);	
	        }
	    });
	}
})

app.get('/writings',function(req,res){
	var before = req.query.before;
	var which = req.query.which;
	var sql = 'select * from '+before+' where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		if(err) console.log(err);
		else{
			res.render('writings/writings',{
				status : req.signedCookies.login_status,
				lists : rows[0],
				user_id : req.cookies.user_id,
				writer : rows[0].user_id,
				admin : req.cookies.admin,
				before : before,
			});
		}
	});
});
app.get('/delete_server',function(req,res){
	var before_page = req.query.before;
	var title = req.query.title;
	var sql = 'delete from '+before_page+' where title=?';
	conn.query('select * from '+before_page+' where title=?',[title],function(err,rows,fields){
		if(err) console.log(err);
		else {
			fs.unlink('views/uploads/'+rows[0].coverimage,function(err){
				if(err) console.log(err);
				else {
					conn.query(sql,[title],function(err,rows,fields){
						if(err) console.log(err);
						else {
							res.redirect('/menu/'+before_page);
						}
					})
				}
			})
		}
	})
})

//===================

//photo uploader

//=================


//Test

app.get('/upload_test',function(req,res){
	res.render('upload_test',{
		status : req.signedCookies.login_status,
		admin : req.cookies.admin,
	});
});

app.post('/upload_test', upload.single('img'), function(req, res){
  console.log(req.file.originalname); 
  res.redirect('/');
});

//=================
app.listen(800,function(){
	console.log("Server activated at 800 port!");
});

//==================



//conn.end();