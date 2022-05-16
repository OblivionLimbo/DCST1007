class Ingrediens {
    constructor(name, unit, amount, price, date){
        this.name = name;
        this.unit = unit;
        this.amount = amount;
        this.price = price;
        date==undefined ? this.date = 'Unknown' : this.date = date;
    }
}

