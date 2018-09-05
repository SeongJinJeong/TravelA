##MYSQL 요약정리!
### 1. mysql에 데이터가 있는지 확인하기
```javascript
conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
```
#### 위와같은 문장에서 rows에 값이 있는지 확인하는 방법은 직접 데이터를 불러오는것이 아니라 길이로 확인하는것이다.
#### EX) rows.length
```javascript
conn.query('select * from user_idpass where id = ? and pass = ?',[id,passwd],function(err,rows,fields){
	if(err) console.log(err);
	else if(rows.length > 0){
		message = "LOGIN COMPLETE!";
	}
	else {
		message = "INVALID LOGIN!";
	}
```


##JAVASCRIPT 요약정리!

### 1. 브라우저의 크기를 갖고오는 법
```css
body {
	width : 100%;
	height : 100%;
}
```
위와 같은 코드를 사용해도 안에 내용이 없으면 사이즈가 적용이 안되서 곤란하기 마련이다.
하지만 다음과 같은 코드를 써서 사용자의 브라우저의 크기를 통해 최대 혹은 최소 높이와 크기를 설정할 수 있다.

```javascript
var winWidth = window.outerWidth;
var winHeight = widow.outerHeight;

$('body').css('min-height',winHeight);
$('body').css('min-width',winWidth);
```

### 2. 문자를 전부 소문자로 바꾸는 법
```javascript
var user_id = 'AdMin';

//how to check user_id is similar to admin or not

if(user_id.toLowerCase() == 'admin'){
	return false;
}
else {
	return true;
}
```
##node.js 요약정리!

### 1. 쿠키를 통해 로그인 상태 유지하는 법
서버를 통해 로그인을 할때 서버에서 로그인 값을 쿠키로 사용자의 브라우저에 저장시킨다.
#### EX)
```javascript
if(login){
	res.cookie('login_status',1,{signed:true}); //signed : 쿠키의 값을 암호화 시킨다. true:암호화 false: 암호화X
}
app.get('/',function(req,res){
	res.render('index',{
		status : req.signedCookies.login_status, //암호화가 되지 않은 쿠키는 res.cookies.login_status로 사용한다.
		})
	})