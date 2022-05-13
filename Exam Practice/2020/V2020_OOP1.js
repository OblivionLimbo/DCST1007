class Circle {
    constructor(radius, color) {
        if(radius <= 0 || radius === undefined || isNaN(radius)){
            this.radius = 1;
        } else {
            this.radius = radius;
        }
        if(color === undefined || color === ''){
            this.color = "red";
        } else{
            this.color = color;
        }
    }
    area() {
        return (Math.PI * this.radius * this.radius).toFixed(2);
    }
    circumference() {
        return (2 * Math.PI * this.radius).toFixed(2);
    }
    rad() {
        return (this.radius).toFixed(2);
    }
}

// Example Circles

let exampleBtn = document.createElement("button");
    exampleBtn.innerHTML = "Create Example Circles";
document.body.appendChild(exampleBtn);

let exampleInfo = document.createElement("p");
    exampleInfo.id = "exampleInfo";
document.body.appendChild(exampleInfo);

exampleBtn.onclick = () => {
    let exampleCircle1 = new Circle();
    let exampleCircle2 = new Circle(2, "blue");

    document.getElementById("exampleInfo").innerText = `Circle 1:
    Radius: ${exampleCircle1.rad()} | Area: ${exampleCircle1.area()} | Circumference: ${exampleCircle1.circumference()} | Color: ${exampleCircle1.color}
    ______________________________________________________
    Circle 2: 
    Radius: ${exampleCircle2.rad()} | Area: ${exampleCircle2.area()} | Circumference: ${exampleCircle2.circumference()} | Color: ${exampleCircle2.color}
    `
}

// Custom Circles

let circleInfo = document.createElement('p');
circleInfo.innerHTML = "";
circleInfo.id = "circleInfo";

let radiusinput = document.createElement('input');
radiusinput.type = "number";
radiusinput.id = "radiusInput";
radiusinput.placeholder = "Enter radius";
document.body.appendChild(radiusinput);
let colorinput = document.createElement('input');
colorinput.type = "text";
colorinput.id = "colorInput";
colorinput.placeholder = "Enter color";
document.body.appendChild(colorinput);


let circleBtn = document.createElement('button');
circleBtn.innerHTML = "Create Circle"
circleBtn.onclick = () => {
    let radius = parseInt(document.getElementById("radiusInput").value);
    let color = document.getElementById("colorInput").value;
    let circle1 = new Circle(radius, color);
    console.log(circle1)
    document.getElementById("circleInfo").innerText += `Radius: ${circle1.rad()} | Area: ${circle1.area()} | Circumference: ${circle1.circumference()} | Color: ${circle1.color}
    `;
}

document.body.appendChild(circleBtn);
document.body.appendChild(circleInfo);

// Cube

class Cube {
    constructor(Cicle) {
        let area = Cicle.area();
        this.side = Math.sqrt(area / 6);
    }
}
