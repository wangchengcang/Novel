var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var querystring=require('querystring');
var path=require('path');
var router = express.Router();
//头像
router.use(multer({
	dest:'./public/file'
}).any())
router.post('/img',function(req,res){
 	var f=req.files[0];
 	console.log(f)
 	var name=f.filename;
	var newname=name+path.parse(f.originalname).ext;
	fs.renameSync('./public/file/'+name,'./public/file/'+newname)
	res.send('/file/'+newname)
})
//注册
router.post('/zc',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.user],
		sql:'select user from usera where user=?',
		success(data){
			if(data.length){
				res.send('no')
			}else{
				sql.con({
					arr:[json.name,json.user,json.pass,json.img],
					sql:'insert into usera(name,user,pass,img) values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		}
	})
})
//登录
router.post('/in',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.user,json.pass],
		sql:'select * from usera where user=? and pass=?',
		success(data){
			if(data.length){
     		    data[0].pass='';
     		    res.send(data[0])
			}else{
				res.send('ok')
			}
		},
		error(err){
			res.send(err)
		}
		
	})
})	
module.exports = router;
