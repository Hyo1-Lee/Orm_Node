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

express express-nodesample1 --view-ejs 

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

npm start