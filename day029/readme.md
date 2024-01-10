## CORS 이슈
  
- 동일 출처(프론트엔드리소스) 동일 출처 데이터 백엔드리소스(RESTAPI) 위반
- 프론트엔드 웹페이지와 백엔드 RESTAPI 가 같은 도메인주소(서버)에서 제공되는경우는 CORS이슈가 발생안함...

**BUT**
RESTFUL을 호출하는 클라이언트(모바일앱/타사사이트/프론트엔드 다른도메인사이트/로컬컴퓨터)등

  
  

**Client                                                                                  RESTFul Backend**

  

Mobile Natvie App

Mobiel Cross Platform APP(Flutter...)

RESTful을 서비스하는 동일 어플리케이션내 WebPage                    RESTful Data Backend Servcie1

타사 웹페이지

자사의 별도 도메인으로 서비스되는 프론트엔드 웹페이지

자사의 별도 도메인으로 서비스되는 웹사이트

로컬컴퓨터에서 직접 띠운 웹페이지