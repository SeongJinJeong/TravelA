#MYSQL 요약정리!
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


#JAVASCRIPT 요약정리!

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


