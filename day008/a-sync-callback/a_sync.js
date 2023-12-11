
// 자바스크립트 언어의 기본 특성
// 1. 자바 스크립트는 기본적으로 비동기 프로그래밍 방식으로 작동됨

// Activity 1
function fn1(){
    console.log("_________________ fn1");
}
// Activity 2
function fn2(callback, msg){
    // 지정한 시간 후에 해당 함수가 실행된다.
    // 익명 콜백함수
    setTimeout(function(){
        console.log("_________________ fn2");
        // fn3()
        // fn31("called from fn2");
        callback(msg);
    }, 2000);
}
// Activity 3
function fn3(){
    console.log("_________________ fn3");
}

function fn31(msg){
    console.log(`_________________ fn31 ${msg}`);
}

// Task1 : fn1()+fn2()+fn3()
// fn1();
// fn2();
// fn3();

// Task2 : 순서를 지켜 가면서 로직 구현
// fn1();
// fn2();

// Task3 : 함수 안에서 특정 함수를 호출해서 작업의 우선순위를 조절하여 함수나 함수의 조건이 바뀌면
// 매번 해당 함수의 기능을 변경해 줘야 한다.
// 자바스크립트 함수는 객체로 인식됨
var msg = 'testing ...'
fn1();
fn2(fn31, msg);
