 fetch("fylkestopper.json")
    .then(response => response.json())
    .then(json => showTable(json))
    .catch(error => showError(error));

    function showError(error){
        console.log(error);
    }

    // Table

    function showTable(fylkestopper){
        let table = document.createElement("table");
            table.classList.add("niceTable");
        let thead = table.createTHead()
        let row = thead.insertRow()
        let cell = row.insertCell()
            cell.innerHTML = "<b>Fylke</b>"
            cell = row.insertCell()
            cell.innerHTML = "<b>Fjelltopp</b>"
            cell = row.insertCell()
            cell.innerHTML = "<b>Høyde</b>"
        fylkestopper.sort(function(a,b) {
            return b.hoyde - a.hoyde;
        })
        for(let i in fylkestopper){
            let fylke = fylkestopper[i]
            row = table.insertRow()
            console.log(fylke)
            cell = row.insertCell()
            cell.innerHTML = fylke.fylke
            cell = row.insertCell()
            cell.innerHTML = fylke.fjell
            cell = row.insertCell()
            cell.innerHTML = fylke.hoyde + " m"
        }
        document.getElementById("mountains").appendChild(table);
    }

    // Map

    