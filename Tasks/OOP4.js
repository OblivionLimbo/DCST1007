// 1 - Test number

var n = Number(document.getElementById("num").value)

document.getElementById("num").oninput = () => {
    n = document.getElementById("num").value
    checkError()
}

async function testNumber(n) {
    return new Promise(
        (resolve, reject) => {
            if (n == 10) {
                let message = `${n} = 10`
                resolve(message);
            } else if (n > 10) {
                let message = `${n} > 10`
                resolve(message);
            } else if (n < 10) {
                let message = `${n} < 10`
                resolve(message);
            } else {
                let message = `${n} is not a valid input`
                reject(message)
            }
        }
    )
}

async function checkError() {
    try {
        let message = await testNumber(n);
        document.getElementById("ans1").innerHTML = "Answer: <br> " + message
        // console.log("Answer: " + message)
    } catch (error) { 
        document.getElementById("ans1").innerHTML = "Error: <br>" + error
        // console.log(new Error(error))
    }
}

(async () => {
    await checkError();
})();

// 2 - Uppercase & sort letters

// document.getElementById("btn").onclick = () => {
//     let letters = document.getElementById("letters").value;
//     makeUppercaseLetters(letters);
// }

// document.getElementById("letters").oninput = () => {
//     console.log(typeof document.getElementById("letters").value)
// }

async function makeUppercaseLetters(word) {
    return new Promise(
        (resolve, reject) => {
            if (Array.isArray(word)) {
                word.forEach(w => {
                    if (typeof w !== 'string') {
                        reject(new Error('An element in the list is not a string'))
                    }
                })
                resolve(word.map(w => w.toUpperCase()));
            } else {
                reject(new Error('The input is not an array'))
            }
        }
    )
}

async function sortLetters(word) {
    return new Promise(
        (resolve, reject) => {
            if (Array.isArray(word)) {
                let sorted = word.sort();
                resolve(sorted);
            } else {
                reject(new Error('The input is not an array'))
            }
        }
    )
}

async function bigLettersSorted(word){
    try {
        let upper = await makeUppercaseLetters(word);
        let result = await sortLetters(upper);
        console.log(`The array in uppercase: ${upper}, and sorted ${result}`)
    } catch (error) {
        console.log(new Error(error.message))
    }

}

bigLettersSorted('A string will not work')
bigLettersSorted(["Adding","a","number","like",4,"won't","work"])
bigLettersSorted(["This","will","work","because","it","is","an","array","of","strings"])

// 3 - Github avatar