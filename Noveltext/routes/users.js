var express = require('express');
var fs=require('fs');
var sql=require('./mysql.js');
var multer=require('multer');
var url=require('url');
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
//小说封面
//xsimg
router.post('/xsimg',function(req,res){
 	var f=req.files[0];
 	console.log(f)
 	var name=f.filename;
	var newname=name+path.parse(f.originalname).ext;
	fs.renameSync('./public/file/'+name,'./public/file/'+newname)
	res.send('/file/'+newname)
})
//发布小说
router.post('/set_text',function(req,res){
	var json=req.body;
	console.log(json)
	sql.con({
		arr:[json.titleimg,json.title,json.name,json.xq,json.songuid],
		sql:'insert into xs(ximg,xtitle,xname,xcontent,songuid) values(?,?,?,?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
//小说章节
//set_list
router.post('/set_list',function(req,res){
	var json=req.body;
	console.log(json)
	sql.con({
		arr:[json.list,json.txt,json.xsuid],
		sql:'insert into list(ztitle,zcontent,xsuid) values(?,?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})	
//搜索
//ss
router.post('/ss',function(req,res){
	var json=req.body;
	console.log(json.text)
	sql.con({
		arr:[json.text],
		sql:'select * from xs where xtitle like "%"?"%"',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})	
//热推
router.post('/rt',function(req,res){
	sql.con({
		arr:[],
		sql:'select * from xs',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
//点击小说查看详情	
router.post('/xq',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.uid],
		sql:'select * from list where xsuid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
//小锁内容
//concent
router.post('/concent',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.uid],
		sql:'select * from list where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
//发表评论
//comment
router.post('/comment',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.username,json.userimg,json.content,json.xsuid,json.useruid],
		sql:'insert into comment(username,userimg,content,xsuid,useruid) values(?,?,?,?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
//展示当前小说评论
//comment_list
router.post('/comment_list',function(req,res){
	var json=req.body;
	sql.con({
		arr:[json.uid],
		sql:'select * from comment where xsuid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
		
	})
})
module.exports = router;
