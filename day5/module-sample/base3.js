
const {odd, even} = require('./base1'); // .js 생략 가능
const checkOddEven = require('./base2'); // 함수도 직접 받을 수 있다.

function checkStringOddEven(str){
    if(str.length%2){
        return odd;
    }
    else{
        return even;
    }
}

console.log("숫자에 대해 홀수 짝수 여부를 판단해보자", checkOddEven(2));
console.log("문자열 길이가 홀수인지 짝수인지 여부를 판단해보자", checkStringOddEven("안녕하세요"));