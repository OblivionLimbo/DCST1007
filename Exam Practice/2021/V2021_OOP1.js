class Kjoretoy {
    constructor(makshastighet, kjorelengde) {
        this.makshastighet = makshastighet;
        this.kjorelengde = kjorelengde;
    }
}

let kjoretoy1 = new Kjoretoy(120, 150);

document.body.innerText += `Kjøretøy 1: Makshastighet: ${kjoretoy1.makshastighet} km/t | Kjørelengde: ${kjoretoy1.kjorelengde} km \n\n`;

class Buss extends Kjoretoy {
    constructor(makshastighet, kjorelengde, makspassasjerer) {
        super(makshastighet, kjorelengde);
        this.makspassasjerer = makspassasjerer;
    }
    sjekkAntall(antallpassasjerer) {
        if (antallpassasjerer > this.makspassasjerer) {
            return false;
        }
        return true;
    }
}

let buss1 = new Buss(90, 200, 65);

document.body.innerText += `Buss 1: Makshastighet: ${buss1.makshastighet} km/t | Kjørelengde: ${buss1.kjorelengde} km | Maks passasjerer: ${buss1.makspassasjerer} \n\n`;

let checkInp = document.createElement('input');
checkInp.type = "number";
checkInp.id = "antallpassasjerer";
checkInp.placeholder = "Enter number of passengers";
document.body.appendChild(checkInp);

let checkBtn = document.createElement("button");
    checkBtn.innerHTML = "Check if buss can hold passengers";
document.body.appendChild(checkBtn);

let checkInfo = document.createElement("p");
    checkInfo.id = "checkInfo";
document.body.appendChild(checkInfo);

    checkBtn.onclick = () => {
        let antallpassasjerer = document.getElementById("antallpassasjerer").value;
        if (buss1.sjekkAntall(antallpassasjerer)) {
            checkInfo.innerText += `Buss 1 can hold ${antallpassasjerer} passengers. \n\n`;
        }
        else {
            checkInfo.innerText += `Buss 1 cannot hold ${antallpassasjerer} passengers. \n\n`;
        }
    }