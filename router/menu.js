var express = require('express');
var router = express.Router();
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


router.get('/japan',function(req,res){
	req.cookies.before_page = "japan";
	var list = [];
	var sql = 'select * from japan';
	conn.query(sql,function(err,rows,fields){
	   for(var i = 0 ; i<rows.length;i++){
	       list[i] = {title : rows[i].title, author : rows[i].author, 
	       content : rows[i].content} 
	   }
	res.render('menu/japan/jp',{
	    status : req.signedCookies.login_status,
	    lists : list,
	    });
	 });
}); 

router.get('/japan/writings',function(req,res){
	var which = req.query.which;
	var sql = 'select * from japan where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		res.render('menu/japan/writings',{
			status : req.signedCookies.login_status,
			lists : rows[0],
			user_id : req.signedCookies.user_id,
			writer : rows[0].user_id,
			admin : req.cookies.admin,
		});
	});
});

router.get('/australia',function(req,res){
	req.cookies.before_page = 'australia';
	var list = [];
	var sql = 'select * from australia';
	conn.query(sql,function(err,rows,fields){
	   for(var i = 0 ; i<rows.length;i++){
	       list[i] = {title : rows[i].title, author : rows[i].author, 
	       content : rows[i].content} 
	   }
	res.render('menu/australia/aus',{
	    status : req.signedCookies.login_status,
	    lists : list,
	    });
	 });
});

router.get('/australia/writings',function(req,res){
	var which = req.query.which;
	var sql = 'select * from australia where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		res.render('menu/australia/writings',{
			status : req.signedCookies.login_status,
			lists : rows[0],
		});
	});
});



router.get('/england',function(req,res){
	req.cookies.before_page = 'england';
	var list = [];
	var sql = 'select * from england';
	conn.query(sql,function(err,rows,fields){
	   for(var i = 0 ; i<rows.length;i++){
	       list[i] = {title : rows[i].title, author : rows[i].author, 
	       content : rows[i].content} 
	   }
	res.render('menu/england/eng',{
	    status : req.signedCookies.login_status,
	    lists : list,
	    });
	 });
});

router.get('/england/writings',function(req,res){
	var which = req.query.which;
	var sql = 'select * from england where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		res.render('menu/england/writings',{
			status : req.signedCookies.login_status,
			lists : rows[0],
		});
	});
});



router.get('/community',function(req,res){
	req.cookies.before_page = 'community';
	var list = [];
	var sql = 'select * from community';
	conn.query(sql,function(err,rows,fields){
	   for(var i = 0 ; i<rows.length;i++){
	       list[i] = {title : rows[i].title, author : rows[i].author, 
	       content : rows[i].content} 
	   }
	res.render('menu/community/com',{
	    status : req.signedCookies.login_status,
	    lists : list,
	    });
	 });
});

router.get('/community/writings',function(req,res){
	var which = req.query.which;
	var sql = 'select * from community where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		res.render('menu/community/writings',{
			status : req.signedCookies.login_status,
			lists : rows[0],
		});
	});
});



router.get('/usa',function(req,res){
	req.cookies.before_page = 'usa';
	var list = [];
	var sql = 'select * from usa';
	conn.query(sql,function(err,rows,fields){
	   for(var i = 0 ; i<rows.length;i++){
	       list[i] = {title : rows[i].title, author : rows[i].author, 
	       content : rows[i].content} 
	   }
	res.render('menu/usa/usa',{
	    status : req.signedCookies.login_status,
	    lists : list,
	    });
	 });
});

router.get('/usa/writings',function(req,res){
	var which = req.query.which;
	var sql = 'select * from usa where title=?';
	conn.query(sql,[which],function(err,rows,fields){
		res.render('menu/usa/writings',{
			status : req.signedCookies.login_status,
			lists : rows[0],
		});
	});
});




module.exports = router;	