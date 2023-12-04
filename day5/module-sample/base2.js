// base1 모듈에서 제공해주는 각종 상수와 함수를 참조한다.
// 다른 모듈 / 설치된 노트 패키지 기능 사용(참조)하기 위해서는 require라는 예약어 사용
// 객체의 비구조화 할당
const {odd, even, test} = require('./base1.js');

// 숫자를 매개변수로 받아서 해당 값이 홀수인지 짝수 값인지 체크
function checkOddEven(num){
    if (num%2){
        return odd;
    }
    return even;
}

// var result = checkOddEven(10);
// console.log("10은 " + result);
// console.log(`10이라는 숫자는 ${result}`);

module.exports = checkOddEven;