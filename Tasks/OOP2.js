const logging = document.getElementById("logging")
let accounts = [];
let hours;
let minutes;
class Account {
    constructor(id,name,balance){
        if(isNaN(balance) || balance < 0){
            console.log(`All balances need to be a number that is bigger or equal to zero`)
            return;
        }
        if(name == "" || name.length <= 1){
            console.log(`Your name must be a real name longer than 1 character`)
            return;
        }
        if(id < count){
            console.log(`Your Account ID cannot be less than 1`)
            return;
        }
        this.id = id
        this.name = name
        this.balance = balance
        // console.log(`${this.name} has this account: ${this.id}, with a balance of ${this.balance}`)
    }
    deposit(sum,date){
        this.balance += sum;
        date.getHours() < 10 ? hours = "0" + date.getHours(): hours = date.getHours()
        date.getMinutes() < 10 ? minutes = "0" + date.getMinutes(): minutes = date.getMinutes()
        return`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${hours}:${minutes} 
        ${this.name} deposited ${sum}, and now has a balance of ${this.balance} \n\n`
    }
    withdraw(sum,date){
            date.getHours() < 10 ? hours = "0" + date.getHours(): hours = date.getHours()
            date.getMinutes() < 10 ? minutes = "0" + date.getMinutes(): minutes = date.getMinutes()
        if(sum > this.balance){
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${hours}:${minutes} 
            ${this.name} tried to withdraw ${sum}, but has insufficient funds, their balance is ${this.balance} \n\n`
        }
        else{
            this.balance -= sum;
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${hours}:${minutes} 
            ${this.name} withdrew ${sum}, and now has a balance of ${this.balance} \n\n`
        }
    }
    transfer(to,sum,date){
            date.getHours() < 10 ? hours = "0" + date.getHours(): hours = date.getHours()
            date.getMinutes() < 10 ? minutes = "0" + date.getMinutes(): minutes = date.getMinutes()
        if(this.balance < sum){
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${hours}:${minutes}
             ${this.name} tried to transfer ${sum} to ${to.name}, but they have insufficient funds, they currently have ${this.balance} \n\n`;
        }
        else{
            this.balance -= sum;
            to.balance += sum;
            return`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${hours}:${minutes} 
            ${this.name} transferred ${sum} to ${to.name} \n\n`;   
        } 
    }
    accountInformation(){
        return `${this.name} has this account: ${this.id}, with a balance of ${this.balance} \n\n`;
    }    
}

class childAccount extends Account {
    constructor(id,name){
        super(id,name,200)
    }
}

let lise,kari,petter,count;

let liseCheck = document.getElementById("liseCheck");
let kariCheck = document.getElementById("kariCheck");
let petterCheck = document.getElementById("petterCheck")
document.getElementById("createGenericAccounts").onclick = () => {
    logging.innerHTML = "";
    document.getElementById("simulateActivty").style.visibility = "visible"
    document.getElementById("createGenericAccounts").style.visibility = "hidden"
    lise = ""
    kari = ""
    petter = ""
    count = 0;
    if(Number(document.getElementById("liseAmount").value) < 0
    || Number(document.getElementById("kariAmount").value) < 0 
    || Number(document.getElementById("petterAmount").value) < 0){
        console.log(`The amount of money in any account cannot be below zero`)
    }
    count += 1;
    liseCheck.checked ? 
    lise = new childAccount(count,"Lise Jensen") :
    lise = new Account(count,"Lise Jensen",Number(document.getElementById("liseAmount").value));
    count += 1;
    kariCheck.checked ? 
    kari = new childAccount(count,"Kari Hansen") :
    kari = new Account(count,"Kari Hansen",Number(document.getElementById("kariAmount").value));
    count += 1;
    petterCheck.checked ? 
    petter = new childAccount(count,"Petter Olsen") :
    petter = new Account(count,"Petter Olsen",Number(document.getElementById("petterAmount").value));
    logging.innerText += lise.accountInformation()
    logging.innerText += kari.accountInformation()
    logging.innerText += petter.accountInformation()
}

document.getElementById("simulateActivty").onclick = () => {
    document.getElementById("simulateActivty").style.visibility = "hidden"
    document.getElementById("createGenericAccounts").style.visibility = "visible"
    logging.innerText += kari.withdraw(300,new Date(2022, 2, 4, 10, 30))
    logging.innerText += lise.deposit(4000,new Date(2022, 2, 4, 11, 00))
    logging.innerText += petter.deposit(3000,new Date(2022, 2, 4, 11, 00))
    logging.innerText += kari.transfer(petter,250,new Date(2022, 2, 4, 12, 15))
    logging.innerText += kari.withdraw(800,new Date(2022, 2, 4, 17, 30))
}

// Extra work not part of the task > creating accounts and 

let accountCheck = document.getElementById("accountCheck");

accountCheck.onchange = () => {
    if(accountCheck.checked){
        document.getElementById("balance").style.visibility = "hidden";
    }
    else{
        document.getElementById("balance").style.visibility = "visible";
    }
}

document.getElementById("createAccount").onclick = () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let balance = Number(document.getElementById("balance").value);
    if(id == "" || name == "" || id < count){
        console.log(`You need to insert a valid name and an account number, that is not alreay taken`);
        return;
    }
    else if(isNaN(balance) || balance < 0){
        console.log(`You need to insert a number that is not negative`);
        return;
    }
    if(accountCheck.checked){
        accounts.push(new childAccount(id,name));
        updateAccounts();
    }
    else{
        accounts.push(new Account(id,name,balance));
        updateAccounts();
    }
    
}

let selAccount = document.getElementById("account");
let sel2Account = document.getElementById("secondAccount")

function updateAccounts(){
    selAccount.innerHTML = "";
    sel2Account.innerHTML = "";
    for(let i = 0; i < accounts.length; i++){
        let x = document.createElement("option")
        let y = document.createElement("option")
        x.innerText = `${accounts[i].id} | ${accounts[i].name}`
        y.innerText = `${accounts[i].id} | ${accounts[i].name}`
        x.value = accounts[i].id;
        y.value = accounts[i].id;
        selAccount.appendChild(x);
        sel2Account.appendChild(y);
    }
}

let operation = document.getElementById("operation");

operation.onchange = () => {
    if(operation.value === "transfer"){
        document.getElementById("secondAccount").style.visibility = "visible"
        document.getElementById("2label").style.visibility = "visible"
    }
    else{
        document.getElementById("secondAccount").style.visibility = "hidden"
        document.getElementById("2label").style.visibility = "hidden"
    }
}

document.getElementById("confirmOperation").onclick = () => {
    if(operation.value == "withdraw"){
        (accounts.find(({id}) => id === document.getElementById("account")
        .value))
        .withdraw(Number(document.getElementById("amount").value)
        ,new Date());
    }   
    else if(operation.value == "deposit"){
        (accounts.find(({id}) => id === document.getElementById("account")
        .value))
        .deposit(Number(document.getElementById("amount").value)
        ,new Date());
    }
    else if(operation.value == "transfer"){
        if(document.getElementById("account").value == document.getElementById("secondAccount").value){
            logging.innerHTML += `You cannot transfer points to the same account`
        }
        else{
            (accounts.find(({id}) => id === document.getElementById("account")
            .value))
            .transfer(accounts.find(({id}) => id === document.getElementById("secondAccount").value)
            ,Number(document.getElementById("amount").value)
            ,new Date());
        }
    }
}
