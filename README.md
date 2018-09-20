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
var winHeight = window.outerHeight;

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

### 3. Naver Smart Editor2 사용법
먼저 네이버 개발자센터의 깃허브 https://github.com/naver/smarteditor2 주소에 들어가 파일을 다운받는다. 그리고 dist폴더를 내 서버에 저장시킨다.(폴더명을 변경해도 상관없음.)
에디터를 적용시킬 html 혹은 ejs 파일에 HuskyEZCreator.js 파일을 적용시킨다. 필자의 경로는 ../Api/se2/js/service/HuskyEZCreator.js 이다.
#### EX)
```html
<script type="text/javascript" src="../Api/se2/js/service/HuskyEZCreator.js"></script>
```
그 다음 적용시키고 싶은 textarea의 id값을 이용해 설정해 준다.
```html
<textarea cols="102" rows="30" class="writing" name="contents" id="contents" style="resize: none;" placeholder="Write Your Contents">Write Your Contents!</textarea>
<button id="uploadButton">Upload</button>


<script type="text/javascript">
	var oEditors = [];	//전역변수를 처음에 설정해준다.
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: "contents",	//textarea의 id값을 넣어준다.
		sSkinURI: "../Api/se2/SmartEditor2Skin.html",	//dist파일에 있는 SmartEditor2Skin.html 파일의 경로를 넣어준다.
		htParams : {
			bUseVerticalResizer : false,	//크기 조절 바를 생성한다.(true: 생성 , false : 제거)
			bUseModeChanger : false,		//모드 조절 바를 생성한다.(true: 생성 , false : 제거)
		},
		fCreator: "createSEditor2"
	});

	//버튼을 눌렀을 시 form안의 값들이 전송되게 한다.
	$("#uploadButton").click(function(){
		oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);	//"" 안에 textarea의 id값을 넣어준다.
		$("#frm").submit();		//form을 전송한다.
	});
</script>
```

##### TIPS)
1. 왜그런지는 모르겠지만 input 태그를 사용한 버튼은 submit이 작동을 하지 않는다. 따라서 input 태그 대신 button 태그를 사용하는게 좋다.
2. 에디터 설정 스크립트 코드를 textarea 바로 밑에 넣어야한다. 그렇지 않으면 mime type에러 혹은 404에러가 나온다.

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
```

### 2. 이미지 업로드 하는 법!
mysql과 multer 모듈을 사용해서 이미지를 업로드 하는법이다.
먼저 multer 모듈과 mysql 모듈을 받아오고 html 혹은 ejs 등의 프론트에서 업로드할 수 있는 태그를 추가해 준다.
#### EX)
```javascript
const mysql = require('mysql');			//  1
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'test',
	password : '1234',
	database : 'test',
	multipleStatements: 'true'
});
conn.connect();

const multer = require('multer');
const upload = multer({					//  2
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'views/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});
```
```html
<form action="/upload" method="post" enctype="multipart/form-data">
	<input type="file" name="img">			//  3
	<input type="submit">
</form>
```

그리고 서버에서 프론트의 name 값을 받아서 잘 가공하면 된다.

```javascript
app.post('/upload',upload.single('img'),function(req,res){		//  4 ==> (upload.single(업로드 이미지의 name 값))
	var coverimage = req.file.originalname;						//  5
	var sql = "insert into "+before_page+"(title,author,content,user_id,coverimage) values(?,?,?,?,?)";
	conn.query(sql,[title,author,contents,user_info.id,coverimage],function(err,rows,fields){		//  5
	    if(err) console.log(err);
	    else {
	      	console.log(req.file);
	        res.redirect('/menu/'+before_page);	
	    }
	});
});
```
post의 가운데 upload.single을 통해 이미지를 지정했던 경로에 넣는다. 또한 req.file을 통해 파일의 세부사항을 가져올 수 있는데, req.file.originalname은 유저가 업로드한 이미지의 이름을 가져올 수 있다. 나는 이미지를 서버내 폴더의 경로에 집어넣었고, originalname을 데이터베이스에 넣어 이미지가 필요할 때 데이터베이스의 rows[0].coverimage를 통해 폴더에서 이미지를 찾아 가져올 수 있게 만들었다.

#### 총 정리!
1. mysql 모듈과 multer 모듈을 받아온다.
2. multer 모듈의 속성을 정의해준다.
3. name 값을 지정한 파일 업로드 input 태그를 만든다.
4. 서버에서 upload.sigle을 통해 지정된 경로에 이미지를 넣는다.
5. req.file.originalname 을 통해 데이터베이스에 이미지의 이름을 넣는다.
6. 이미지를 찾을 떄는 데이터베이스의 이미지 이름을 통해 찾는다.


## EJS
ejs는 node.js의 템플릿 엔진중 하나로 그 외에는 jade 등이 있다. 내가 jade 대신 ejs를 택한 이유는 jade는 html문법과 달라 내가 이미 만들어둔 html파일이 있으면 그것을 jade로 새로 만들어야 하고, 또한 jade의 문법을 배우기 귀찮았기에 기본 html 문법을 사용하는 템플릿 엔진인 ejs를 선택했다. (어디서 들었는데 jade는 혼자 작업하기 적합하고, ejs는 여러 팀원과 작업하기 적합하다고 했다.)
내가 쓰고 있는 기본적인 ejs 문법은 다음과 같다.
```ejs
1.  <% javascript %>
2.  <%= 변수 %>
3.  <%- 변수(html) %>
```
1. 1번은 html안에 틈틈히 자바스크립트를 이용해 여러 동적인 기능을 할 때 사용된다.

2. 2번은 서버에서 어떤 값을 받아올때 쓰는데 예를 들어 서버에서 사용자의 이름(userName)을 변수로 넘겨받는다면 <%= userName %> 과 같이 받아올 수 있다.

3. 3번은 2번의 응용으로 쓸 수 있는데, 서버에서 받는 값이 html코드면 2번이 아닌 3번을 써야 html코드가 적용된다.