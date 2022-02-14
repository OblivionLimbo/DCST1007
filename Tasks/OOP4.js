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
        console.log(`The array in uppercase: ${upper}`)
        let result = await sortLetters(upper);
        console.log(`The array sorted and uppercase: ${result}`)
    } catch (error) {
        console.log(new Error(error.message))
    }

}

bigLettersSorted('A string will not work')
bigLettersSorted(["Adding","a","number","like",4,"won't","work"])
bigLettersSorted(["This","will","work","because","it","is","an","array","of","strings"])

// 3 - Github avatar

// The fast version
document.getElementById("gitBtn").onclick = () => {
    let user = document.getElementById("user").value;
    gitHubProfile(user);
}

async function gitHubProfile(user){
            try {
                let url = await fetch(`https://api.github.com/users/${user}`);
                if(url.status != 200){
                    throw(`Unable to get avatar of ${user}, please try a different name`)
                }
                let obj = await url.json();
                document.getElementById("img").src = obj.avatar_url
                document.getElementById("ans3").innerHTML = 
                `This is the avatar of ${obj.login}, their Github link is <a href=${obj.html_url} target="_blank">here</a>` 
                // console.log(obj)
            } catch (error) {
                document.getElementById("img").src = ""
                document.getElementById("ans3").innerHTML = error
                console.log(new Error(error.message)) 
            }
        }

// The Promise Nested Version

let url = new Promise(
    (resolve,reject) => {
        let url = fetch("https://api.github.com/users/github")
        resolve(url);
    }
)

async function getJSON(url){
    return new Promise(
        (resolve,reject) => {
            if(url){
                let json = url.json()
                resolve(json);
            }
            else{
                reject(new Error('Unable to get URL'))
            }
        }
    )

}

async function displayImage(){
    try {
        let a = await url;
        if(a.status != 200){
            throw(`Unable to get avatar, try a different user`)
        }
        let j = await getJSON(a);
        document.getElementById("img2").src = j.avatar_url
        document.getElementById("ans4").innerHTML = 
        `This is the avatar of ${j.login}, their Github link is <a href=${j.html_url} target="_blank">here</a>` 
    } catch (error) {
        document.getElementById("ans4").innerHTML = error
    }
}

(async () => {
    await displayImage();
})();