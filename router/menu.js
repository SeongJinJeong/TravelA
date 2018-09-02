var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'travela',
	password : '1234',
	database : 'travela',
	multipleStatements: 'true'
});
conn.connect();
var lists = [
	{
		title : '',
		author : '',
		content : '',
	}
]

router.get('/japan',function(req,res){
	var sql = 'select * from japan';
	conn.query(sql,function(err,rows,fields){
		for(var i = 0 ; i<rows.length;i++){
			lists[i].title = rows[i].title;
			lists[i].author = rows[i].author;
			lists[i].content = rows[i].content;
		}
	})
	res.render('menu/japan/jp',{
		status : req.signedCookies.login_status,
		lists : lists[0].title,
	});
});
router.get('/austrailia',function(req,res){
	res.render('menu/austrailia/aus',{
		status : req.signedCookies.login_status,
		lists : 1,
	});
});
router.get('/england',function(req,res){
	res.render('menu/england/eng',{
		status : req.signedCookies.login_status,
		lists : 1,
	});
});
router.get('/community',function(req,res){
	res.render('menu/community/com',{
		status : req.signedCookies.login_status,
		lists : 1,
	});
});
router.get('/usa',function(req,res){
	res.render('menu/usa/usa',{
		status : req.signedCookies.login_status,
		lists : 1,
	})
})

module.exports = router;