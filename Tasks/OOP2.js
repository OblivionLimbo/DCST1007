const output = document.getElementById("output")
let accounts = [];
class Account {
    constructor(id,name,balance){
        if(isNaN(balance) || balance < 0){
            this.write(`All balances need to be a number that is bigger or equal to zero`)
        }
        this.id = id
        this.name = name
        this.balance = balance
        // console.log(`${this.name} has this account: ${this.id}, with a balance of ${this.balance}`)
    }
    deposit(sum,date){
        this.balance += sum;
        logging.innerHTML += `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} - ${this.name} deposited ${sum}, and now has a balance of ${this.balance} <br><br>`
    }
    withdraw(sum,date){
        if(sum > this.balance){
            logging.innerHTML += `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} - ${this.name} tried to withdraw ${sum}, but has insufficient funds, their balance is ${this.balance} <br><br>`
        }
        else{
            this.balance -= sum;
            logging.innerHTML += `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} - ${this.name} withdrew ${sum}, and now has a balance of ${this.balance} <br><br>`
        }
    }
    transfer(to,sum,date){
        if(this.balance < sum){
            logging.innerHTML += `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} - ${this.name} tried to transfer ${sum} to ${to.name}, but they have insufficient funds <br><br>`;
        }
        else{
            this.balance -= sum;
            to.balance += sum;
            logging.innerHTML += `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} - ${this.name} transferred ${sum} to ${to.name} <br><br>`;   
        } 
    }
    accountInformation(){
        logging.innerHTML += `${this.name} has this account: ${this.id}, with a balance of ${this.balance} <br><br>`;
    }    
}

class childAccount extends Account {
    constructor(id,name){
        super(id,name,200)
    }
}

let count = 1;

let lise,kari,petter;

let liseCheck = document.getElementById("liseCheck");
let kariCheck = document.getElementById("kariCheck");
let petterCheck = document.getElementById("petterCheck")
document.getElementById("createGenericAccounts").onclick = () => {
    if(liseCheck.checked){
        lise = new childAccount(count,"Lise Jensen");
        count += 1;
    }
    else{
        lise = new Account(count,"Lise Jensen",Number(document.getElementById("liseAmount").value));
        count += 1;
    }
    if(kariCheck.checked){
        kari = new childAccount(count,"Kari Hansen");
        count += 1;
    }
    else{
        kari = new Account(count,"Kari Hansen",Number(document.getElementById("kariAmount").value));
        count += 1;
    }
    if(petterCheck.checked){
        petter = new childAccount(count,"Petter Olsen");
        count += 1;
    }
    else{
        petter = new Account(count,"Petter Olsen",Number(document.getElementById("petterAmount").value));
        count += 1;
    }
    lise.accountInformation()
    kari.accountInformation()
    petter.accountInformation()
}

let logging = document.getElementById("logging");

document.getElementById("simulateActivty").onclick = () => {
    kari.withdraw(300,new Date(2022, 2, 4, 10, 30))
    lise.deposit(4000,new Date(2022, 2, 4, 11, 00))
    petter.deposit(3000,new Date(2022, 2, 4, 11, 00))
    kari.transfer(petter,250,new Date(2022, 2, 4, 12, 15))
    kari.withdraw(800,new Date(2022, 2, 4, 17, 30))
}

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
        (accounts.find
            (({id}) => id === document.getElementById("account").value))
            .withdraw(Number(document.getElementById("amount").value)
            ,new Date());
    }   
    else if(operation.value == "deposit"){
        (accounts.find
            (({id}) => id === document.getElementById("account").value))
            .deposit(Number(document.getElementById("amount").value)
            ,new Date());
    }
    else if(operation.value == "transfer"){
        if(document.getElementById("account").value == document.getElementById("secondAccount").value){
            logging.innerHTML += `You cannot transfer points to the same account`
        }
        else{
            (accounts.find
                (({id}) => id === document.getElementById("account").value))
                .transfer(accounts.find(({id}) => id === document.getElementById("secondAccount")
                .value)
                ,Number(document.getElementById("amount").value)
                ,new Date());
        }
    }
}
