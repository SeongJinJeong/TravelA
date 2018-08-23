#MYSQL 오답정리!
### 1. mysql에 데이터가 있는지 확인하기
'''javascript
conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
'''
#### 위와같은 문장에서 rows에 값이 있는지 확인하는 방법은 직접 데이터를 불러오는것이 아니라 길이로 확인하는것이다.
#### EX) rows.length
'''javascript
conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
	if(err) console.log(err);
	else if(rows.length > 0){
		message = "LOGIN COMPLETE!";
	}
	else {
		message = "INVALID LOGIN!";
	}