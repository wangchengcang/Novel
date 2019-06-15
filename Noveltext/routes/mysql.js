var mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'uuu'
})
module.exports={
	con(json){
			//获得连接
		pool.getConnection(function(err,connection){
			if(err){//err代表失败
				console.log('connection::::'+err);
				json.error(err);
				return
			}
			connection.query(json.sql,json.arr,(err,data)=>{
			if(err){
				console.log('connection::::'+err)
				json.error(err);
				return
			}
			connection.release();//断开连接
			json.success(data);//成功回调
			})
			
		})
	}
}















