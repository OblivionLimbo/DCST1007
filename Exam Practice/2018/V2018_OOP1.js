class Land {
    constructor(navn, areal, folketall, toppdomene) {
        this.navn = navn;
        this.areal = areal;
        this.folketall = folketall;
        this.toppdomene = toppdomene;
    }
    getDensity() {
        return `${(this.folketall / this.areal).toFixed(2)} innbyggere pr. km²`;
    }
}

let Norge = new Land("Norge", 328899, 5385000, ".no");
let Sverige = new Land("Sverige", 449964, 9455000, ".se");
let Russland = new Land("Russland", 17075400, 143989000, ".ru");
let Kina = new Land("Kina", 9596960, 1409517000, ".cn");

let land = [Norge, Sverige, Russland, Kina];

land.map(land => {
    let info = document.createElement('p');
    info.innerText += `${land.navn} (${land.toppdomene}) har ${land.folketall} innbyggere og et areal på ${land.areal}km². 
                       ${land.navn} har en densitet på ${land.getDensity()}`;
    document.body.appendChild(info);
});

function domeneTilLand(domenenavn) {
    let x = land.find(land => land.toppdomene === domenenavn);
    return x ? x.navn : "Fant ikke landet";
}

console.log(domeneTilLand(".no")); // Norge
