// Task 1
class Car {
    constructor(registration, brand, model, speed) {
        this.registration = registration;
        this.brand = brand;
        this.model = model;
        this.speed = speed;
    }

    gas(){
        this.speed += 10;
        this.checkSpeed()
    }
    brake(){
        if(this.speed > 0){
            this.speed -= 10;
        }
        else{
            this.speed = this.speed;
        }
        this.checkSpeed()
    }
    checkSpeed(){
        // console.log(this.speed)
        switch (this.brand) {
            case "Volvo":
                document.getElementById("volvoInfo").innerHTML = `Car: ${this.brand} | Speed: ${this.speed} km/t`
                break;
            
            case "Ferrari":
                document.getElementById("ferrariInfo").innerHTML = `Car: ${this.brand} | Speed: ${this.speed} km/t`
                break;

            case "Lada": 
            document.getElementById("ladaInfo").innerHTML = `Car: ${this.brand} | Speed: ${this.speed} km/t`
                break;
        
            default: 
                break;
        }
    }
}
// Task 2
let volvo = new Car("XH19288","Volvo","xc60",0);
volvo.checkSpeed();
let ferrari = new Car("AC83442","Ferrari","f40",0);
ferrari.checkSpeed();
let lada = new Car("DY64902","Lada","Vesta",0);
lada.checkSpeed();

// let carInfo = document.getElementById('carInfo');

// let volvoInfo = document.createElement('p');
//     volvoInfo.innerHTML = `Car: ${volvo.brand} | Speed: ${volvo.speed} km/t`

// let volvoGas = document.createElement('button'); 
//     volvoGas.innerHTML = "Gas" 
//     volvoGas.onclick = () => {
//         volvo.gas(10)
//         // volvo.checkSpeed()
//         // volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`
//     }
// let volvoBrake = document.createElement('button');
//     volvoBrake.innerHTML = "Brake" 
//         volvoBrake.onclick = () => {
//             volvo.brake(10)
//             // volvo.checkSpeed()
//             // volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`
//         }

// carInfo.appendChild(volvoInfo)
// carInfo.appendChild(volvoGas)
// carInfo.appendChild(volvoBrake)

// let ferrariInfo = document.createElement('p');
//     ferrariInfo.innerHTML = `Car: ${ferrari.brand} | Speed: ${ferrari.speed} km/t`

// let ferrariGas = document.createElement('button');
//     ferrariGas.innerHTML = "Gas" 
//         ferrariGas.onclick = () => {
//             ferrari.gas(10)
//             // ferrari.checkSpeed()
//             // ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`
//         }
// let ferrariBrake = document.createElement('button');
//     ferrariBrake.innerHTML = "Brake" 
//         ferrariBrake.onclick = () => {
//             ferrari.brake(10)
//             // ferrari.checkSpeed()
//             // ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`
//         }

// carInfo.appendChild(ferrariInfo)
// carInfo.appendChild(ferrariGas)
// carInfo.appendChild(ferrariBrake)


// let ladaInfo = document.createElement('p');
//     ladaInfo.innerHTML = `Car: ${lada.brand} | Speed: ${lada.speed} km/t`

// let ladaGas = document.createElement('button');
//     ladaGas.innerHTML = "Gas" 
//         ladaGas.onclick = () => {
//             lada.gas(10)
//             // lada.checkSpeed()
//             // ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`
//     }
// let ladaBrake = document.createElement('button');
//     ladaBrake.innerHTML = "Brake" 
//         ladaBrake.onclick = () => {
//             lada.brake(10)
//             // lada.checkSpeed()
//             // ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`
//         }

// carInfo.appendChild(ladaInfo)
// carInfo.appendChild(ladaGas)
// carInfo.appendChild(ladaBrake)