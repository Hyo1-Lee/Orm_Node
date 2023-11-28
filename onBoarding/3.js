console.log("Hello World")

var userName = "Hola"
var age = 40;
var price = 5000;
var isMale = true;

// 상수
const baseDlvryFee = 3000;

console.log("웹브라우저 콘솔영역에 로깅 - 기본배송비: ", baseDlvryFee);

let totalPrice = 0;
totalPrice += baseDlvryFee;
totalPrice += price;

console.log("총 결제 금액은 : ", totalPrice);

if(isMale == true){
    var msg = "Male";
    console.log("if 구문 블록 범위 안에서 선언된 msg", msg);
}

console.log("if 구문 블록 범위 안에서 선언된 msg", msg);

const region = "제주도";

if(region == "제주도"){
    const addDlyvryFee = 2000;
    let addMsg = "기본 메세지입니다."
    totalPrice += addDlyvryFee;
    console.log("const, let은 블록 범위", addDlyvryFee, addMsg, totalPrice);
}

