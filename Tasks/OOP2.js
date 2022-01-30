const output = document.getElementById("output")
let accounts = [];
class Account {
    constructor(id,name,balance){
        this.id = id
        this.name = name
        this.balance = balance
        return `${this.name} has this account: ${this.id}, with a balance of ${this.balance}`
    }
    deposit(sum){
        this.balance += sum;
        return `${this.name} has this account: ${this.id}, with a balance of ${this.balance}`
    }
    withdraw(sum){
        if(sum > this.balance){
            return `You cannot withdraw more than you have in your account, your balance is ${this.balance}`
        }
        else{
            this.balance -= sum;
            return `${this.name} has this account: ${this.id}, with a balance of ${this.balance}`
        }
    }
    
}

class childAccount extends Account {
    constructor(id,name){
        super(id,name,200);
        return `${this.name} has this account: ${this.id} with a balance of ${this.balance}`
    }
}