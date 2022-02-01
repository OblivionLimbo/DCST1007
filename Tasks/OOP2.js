const output = document.getElementById("output")
let accounts = [];
class Account {
    constructor(id,name,balance){
        this.id = id
        this.name = name
        this.balance = balance
        // console.log(`${this.name} has this account: ${this.id}, with a balance of ${this.balance}`)
    }
    deposit(sum){
        this.balance += sum;
        console.log(`${this.name} depositet ${sum}, and now has a balance of ${this.balance}`)
    }
    withdraw(sum){
        if(sum > this.balance){
            console.log(`You cannot withdraw more than you have in your account, your balance is ${this.balance}`)
        }
        else{
            this.balance -= sum;
            console.log(`${this.name} withdrew ${sum}, and now has a balance of ${this.balance}`)
        }
    }
    accountInformation(){
        console.log(`${this.name} has this account: ${this.id}, with a balance of ${this.balance}`)
    }
}

class childAccount extends Account {
    constructor(id,name){
        super(id,name,200)
    }
}
let petter,kari,lise;

document.getElementById("createGenericAccounts").onclick = () => {
    lise = new childAccount(1,"Lise Jensen");
    kari = new Account(2,"Kari Hansen",895);
    petter = new Account(3,"Petter Olsen",0);
    lise.accountInformation()
    kari.accountInformation()
    petter.accountInformation()
}

document.getElementById("simulateActivty").onclick = () => {
}

document.getElementById("createAccount").onclick = () => {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let balance = Number(document.getElementById("balance").value);
    if(id == "" || name == ""){
        console.log(`You need to insert an account number and name`);
        return;
    }
    else if(isNaN(balance) || balance < 0 || balance == e){
        console.log(`You need to insert a number that is not negative, also it cannot be 'e'`);
        return;
    }
    let x = new Account(id,name,balance)
    accounts.push(x);
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

