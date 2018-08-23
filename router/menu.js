var express = require('express');
var router = express.Router();

router.get('/japan',function(req,res){
	res.render('menu/japan/jp',{
		status : 1
	});
});
router.get('/austrailia',function(req,res){
	res.render('menu/austrailia/aus',{
		status : 1
	});
});
router.get('/england',function(req,res){
	res.render('menu/england/eng',{
		status : 1
	});
});
router.get('/community',function(req,res){
	res.render('menu/community/com',{
		status : 1
	});
});
router.get('/usa',function(req,res){
	res.render('menu/usa/usa',{
		status : 1
	})
})

module.exports = router;