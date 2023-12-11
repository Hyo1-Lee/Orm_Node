
var fnHell = function(){
    console.log("로직 1 완료");
    setTimeout(function(){
        console.log("로직 2 완료");
        setTimeout(function(){
            console.log("로직 3 완료");
            setTimeout(function(){
                console.log("로직 4 완료");
                setTimeout(function(){
                    console.log("로직 5 완료");
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000);
}