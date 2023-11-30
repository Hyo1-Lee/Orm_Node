// 설치한 오픈소스 노드 패키지를 참조
// node.js에서는 require() 예약어를 통해 지정한 설치된 노드패키지를 참조
// moment 패키지는 자바스크립트 일자, 시간 정보를 개발자가 원하는 문자 포맷으로 표현해주는 기능 제공
const moment = require('moment');

// 순수 자바스크립트 일시, 시간 정보 출력
console.log("Original JAVA Time: ", Date.now());

// time printing using moment package
console.log("Time printing with moment package: ", moment(Date.now()).format("yyyy-mm-dd HH:mm:ss"));

//dotenv 패키지는 해당 프로젝트 노드 어플리케이션에 환경설정정보에 접근해서 전역 어플리케이션 환경변수정보를 추출.
const env = require("dotenv");

// 프로젝트 루트에 있는 .env 환경 설정 파일에 정의된 각종 어플리케이션 환경변수를 메모리에 올린다.
env.config()

// .env 파일 내 특정 환경변수 정보 추출
// process -> create a thread processor 
// node application을 관리하는 single thread 환경
const comp_name = process.env.COMPANY_NAME;
console.log("지정한 환경변수 출력", comp_name);

// 노드패키지 용도
// 1. 서비스를 위한 개발 용도 패키지
//     - 서비스를 위해 반드시 필요한 패키지
//     - npm i package
//     - npm i -g package

// 2. 개발할 때만 사용하는 패키지
//     - 개발용 패키지
//     - 개발 생산성, 효율성 제고를 위한 패키지
//     - npm i package --save -dev

