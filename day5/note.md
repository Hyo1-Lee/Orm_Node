### 벡엔드 기술의 공통점 
1. 모든 백엔드 개발언어는 web 개발 framework를 이용한다. 
    framework의 용도?
    - 개발 효율성 증대
    - 기능 개발에 집중 할 수 있다.
2. MVC 개발 패턴을 사용해서 개발한다. 
3. ORM 기법을 사용해서 데이터 처리를 한다.

### 프로젝트 템플릿
하나의 프로젝트를 빠르게 개발할 수 있도록 도와주는 도구

1) Express-generator 패키지를 npm 명령어를 통해 전역으로 최초 한번 설치

npm i -global express-generator

2) Express-generator 설치 후 CLI 를 통해 Node Express 기반 노드 웹 프로젝트 생성
- MVC 패턴 기반의 물리적 노드 웹 프로젝트(프로젝트명= express-nodesample1) 생성 및 샘플 코드 자동 생성해줌
- 프로젝트 생성시 View(화면,HTML) 제어 엔진 기술로 EJS 를 기반으로 프로젝트를 생성.

express express-nodesample1 --view=ejs 

<!-- 
    --view : 백엔드에서 html을 제어할 수 있는 영역
    viewengine : view를 ejs를 이용해서 mvc 
    express-nodesample 생성 명령어
-->

3) 생성된 프로젝트 경로 로 이동 후 프로젝트 실행에 필요한 node 패키지 일괄 복원설치 진행
- 프로젝트 폴더내 package.json 파일내 dependencies에 정의된 패키지 목록 일괄 복원 설치됨
- 하기 npm i 명령어는 반드시 프로젝트 폴더내의 package.json 파일과 동일경로상에서 실행 해야 함.

cd express-nodesample1
npm i

4) 웹 프로젝트 빌드 후 산출물 서버환경에서 실행

- package.json 파일내 scripts에 start 명령어 등록되어 있고 node ./bin/www.js 모듈파일이 실행되게 설정되어 있음
- www.js파일을 통해 노드 어플리케이션(app.js)가 서비스되는 서버환경을 구성해주고 지정된 포트를 통해 서비스됨.
- 웹브라우저를 오픈하고 http://localhost:3000 주소를 호출한다.

npm start

### MVC
1. Model: 백엔드 앱에서 데이터를 처리하는 모든 기능 담당
2. view: 사용자와 상호작용하는 UI/UX (HTML 웹페이지 = HTML+CSS+(Client)JavaScript) 조작 = 변조
    - viewengine 기술: 서버기반(백엔드)에서 웹페이지를 변조/조작할 수 있는 기술
3. Controller(Routes): 사용자 요청과 응답을 처리 (사용자 요청은 주로 URL(웹페이지 주소 체계)를 통해 이루어짐)

### 웹 페이지
1. 정적 웹 페이지
 - 최초로 웹 퍼블리셔가 만든 오리지널 웹 페이지 리소스
 - 프론트/벡엔드 프로그래밍이 적용되지 않은 오리지널 html 페이지 소스

 ~.html

 2. 동적 웹페이지
 - 퍼블리셔에게 제공된 오리지널 정적 웹페이지 소스 변경 (삭제/변경/추가) 또는 변형된 웹 페이지
 - 주로 프론트 엔드 기술 (jquery/react 등)/백엔드 기술(VIEW 엔진기술 = EJS) 등을 이용해 오리지널 제공 html 웹 페이지 소스가 변경된 웹 페이지
 ~.jsp
 ~.php
 ~test.html
 domain/login