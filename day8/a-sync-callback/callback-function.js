// 콜백함수 구현 및 테스트  
function fnPlus(a,b){
    let c=a+b;
    logging(c);
    return c;
}

function logging(result){
    console.log(`계산 결과값은 ${result} 입니다.`);
}

// var result = fnPlus(10, 20);
// console.log("함수 반환 값: ", result);

// 콜백 함수 방식으로 기능 구현
// 기존 logging 
function fnPlus1(a, b, cb){
    let c = a+b;
    cb(c);
    return c;
}

function logging1(result){
    var total = 3000 + result;
    console.log(`계산결과는 배송비가 추가되어 ${total} 원입니다.`);
}

var result1 = fnPlus1(20,30,logging)
var result2 = fnPlus1(20,30,logging1)
var result3 = fnPlus1(20,30,function(result){
    var total = 3000 + result;
    console.log(`계산결과는 배송비가 추가되어 ${total} 원입니다.`);
})

// 콜백함수를 사용하는 목적은 비동기 방식으로 처리되는 자바스크립트 프로그래밍에서 순차적인 프로그래밍을 위해
// 특정 기능을 구현하는 함수에 특정 함수를 매개변수로 전달해서 해당 함수 내의 특정 위치에서
    // 전달된 콜백함수를 실행시켜 원하는 로직/절차를 순차적으로 구현되게 할 수 있음

// 객체 지향 프로그램