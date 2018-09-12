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


router.get('/australia',function(req,res){
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




router.get('/england',function(req,res){
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




router.get('/community',function(req,res){
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




router.get('/usa',function(req,res){
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





module.exports = router;	