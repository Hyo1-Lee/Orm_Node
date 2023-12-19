# View

## html
- Server Side
    1. View, 서버측에서 MVC 기반 html 조작(변경)
    2. View에 보관된 오리지널 html을 그냥 브러우저에 전달하는 경우
    3. public 폴더 안에 순수 ~.html 페이지를 보관하다가 브라우저 호출에 의해 오리지널 html을 전달 하는 경우

- Client Side
    1. 서버에서 조작된 html이나 오리지널 html을 웹 브라우저로 전달해 브라우저에서 해석해서 화면으로 사용자에게 보여주는 부분

## 반응형 웹 페이지
: 반응형 웹은 퍼블리셔가 제공해주는 각종 웹페이지를 다양한 사용자 디바이스 해상도 환경에서 사용하는데,
    디바이스 해상도에 따라 자동으로 컨텐츠를 정렬 제공해서 OneSource Multi-Device 해상도를 지원해주는 기술

EX) CSS, Media Query

- 퍼블리셔나 개발자가(웹 - 프론트 - 백) media query를 직접 사용치 않더라도 손쉽게 반응형 웹을 구현해 주는 반응형 웹 CSS 프레임워크 기술 등장
- 프로그램 단일 소스 -> 라이브러리 -> 패키지 -> 프레임워크(인터프리팅 언어) -> 플랫폼 (컴파일 언어: C#, Java)

## html 구조

<meta charset="utf-8" />

유니코드 문자열로 되어있다. 

유니코드 문자열을 쓰는곳이란? 영어를 제외한 언어 

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

content="width
물리적인디바이스의 width 값 설정

initial-scale=1.0 
모바일 환경이냐 기본크기로 보여주는 설정 

<title>게시글 정보 관리</title>
검색엔진 최적화시 중요!

클라이언트 스크립트 태그는 원칙상으로는 

</body>닫는 태그 바로 위에 작성을 한다. 

why? 위에서부터 코드를 읽어가는데 웹페이지가다 로드되고 기능을 작동시키는게 원리에 맞아서입니다.