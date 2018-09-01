var express = require('express');
var router = express.Router();

router.get('/japan',function(req,res){
	res.render('menu/japan/jp',{
		status : req.signedCookies.login_status,
		lists : 1,
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