// Task 1
class Car {
    constructor(registration, brand, model, speed) {
        this.registration = registration;
        this.brand = brand;
        this.model = model;
        this.speed = speed;
    }

    gas(gasAmount){
        this.speed += gasAmount;
    }
    brake(breakAmount){
        if(this.speed > 0){
            this.speed -= breakAmount
        }
        else{
            this.speed = this.speed;
        }
    }
    checkSpeed(){
        // console.log(this.speed)
        switch (this.brand) {
            case "Volvo":
                volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`
                break;
            
            case "Ferrari":
                ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`
                break;

            case "Lada": 
            ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`
                break;
        
            default:
                break;
        }
    }
}

// Task 2



let volvo = new Car("XH19288","Volvo","xc60",0)
let ferrari = new Car("AC83442","Ferrari","f40",0)
let lada = new Car("DY64902","Lada","Vesta",0)

let carInfo = document.getElementById('carInfo');

let volvoInfo = document.createElement('p');
    volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`

let volvoGas = document.createElement('button'); 
    volvoGas.innerHTML = "Gas" 
    volvoGas.onclick = () => {
        volvo.gas(10)
        volvo.checkSpeed()
        // volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`
    }
let volvoBrake = document.createElement('button');
    volvoBrake.innerHTML = "Brake" 
        volvoBrake.onclick = () => {
            volvo.brake(10)
            volvo.checkSpeed()
            // volvoInfo.innerHTML = `Car: ${volvo.brand} Speed: ${volvo.speed} km/t`
        }

carInfo.appendChild(volvoInfo)
carInfo.appendChild(volvoGas)
carInfo.appendChild(volvoBrake)

let ferrariInfo = document.createElement('p');
    ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`

let ferrariGas = document.createElement('button');
    ferrariGas.innerHTML = "Gas" 
        ferrariGas.onclick = () => {
            ferrari.gas(10)
            ferrari.checkSpeed()
            // ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`
        }
let ferrariBrake = document.createElement('button');
    ferrariBrake.innerHTML = "Brake" 
        ferrariBrake.onclick = () => {
            ferrari.brake(10)
            ferrari.checkSpeed()
            // ferrariInfo.innerHTML = `Car: ${ferrari.brand} Speed: ${ferrari.speed} km/t`
        }

carInfo.appendChild(ferrariInfo)
carInfo.appendChild(ferrariGas)
carInfo.appendChild(ferrariBrake)


let ladaInfo = document.createElement('p');
    ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`

let ladaGas = document.createElement('button');
    ladaGas.innerHTML = "Gas" 
        ladaGas.onclick = () => {
            lada.gas(10)
            lada.checkSpeed()
            // ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`
    }
let ladaBrake = document.createElement('button');
    ladaBrake.innerHTML = "Brake" 
        ladaBrake.onclick = () => {
            lada.brake(10)
            lada.checkSpeed()
            // ladaInfo.innerHTML = `Car: ${lada.brand} Speed: ${lada.speed} km/t`
        }

carInfo.appendChild(ladaInfo)
carInfo.appendChild(ladaGas)
carInfo.appendChild(ladaBrake)

// Oppgave 1 - Lag en klasse: Bil
// Lag en klasse som heter Bil. La denne klassen ha objektvariablene "registreringsnr”,
// ”merke”, ”årsmodell” og ”hastighet”.
// Oppgave 2 - Registrer bilobjekter
// Lag tre bilobjekter og sørg for at objektvariablene får innhold. Kall variablene det du vil, for
// eksempel volvo, ferrari og lada.
// Oppgave 3 - Metoder i klassen Bil
// Vi tenker oss at egenskapen ”hastighet” skal antyde hvor stor fart bilen har akkurat nå, målt i
// antall kilometer i timen. Lag en metode som heter gass() for klassen Bil. Denne metoden skal
// øke farten til bilen med tallet 10. Vi tenker oss her at 10 står for antall kilometer i timen. Lag
// også en metode som heter brems() som skal redusere farten til bilen med 10.
// Oppgave 4 - Kjør bilen fremover
// Lag et program der bilene skal kunne kjøre fremover ved at brukeren skal kunne trykke på
// seks ulike knapper. Ved trykk på den ene knappen, skal den første bilen (volvo) øke farten
// med 10. Tilsvarende skal det være en annen knapp for å redusere farten. Trykker brukeren 3
// ganger på gass-knappen, så skal altså bilen ha 30 km/t som fart. Lag tilsvarende knapper for
// alle bilene.
// Hint: Bruk metoden gass().
// Spørsmål som er verdt å stille seg: Er det nok å bruke lokale variabler når du oppretter
// bilobjektene i dette tilfellet? 
// Oppgave 5 - Hvor fort kjører bilene?
// Lag en ny metode som finner ut hvor fort en bil kjører. Bruk denne metoden til å hele tiden
// vise statusinformasjon om hvor fort de tre bilene kjører på en brukervennlig måte overfor
// brukeren.