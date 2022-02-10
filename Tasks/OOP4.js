// 1 - Test number

document.getElementById("num").oninput = () => {
    let n = Number(document.getElementById("num").value);
    console.log("h")
    testNumber(n);
}

let n = 1;

async function testNumber(n){
    return new Promise(
        (resolve,reject) => {
            if(n==10){
                let result = "The number is 10"
                resolve(result);
            }
            else if(n > 10){
                let result = "The number is larger than 10"
                resolve(result);
            }
            else if(n < 10){
                let result = "The number is smaller than 10"
                resolve(result);
            }
            else{
                let result = "The input was not valid"
                reject(result)
            }
        }
    )
}

async function checkError(){
    try {
        let message = await testNumber(n);
        document.getElementById("ans").innerHTML = "Answer: <br>" + message;
    } catch (error) {
        document.getElementById("ans").innerHTML = "Error: <br>" + error.message;
    }
}

(async () => {
    await checkError();
})();

// 2 - Uppercase letters


