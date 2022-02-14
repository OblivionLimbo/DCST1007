 fetch("fylkestopper.json")
    .then(response => response.json())
    .then(data => console.log(data))
    .then(json => {showTable(json); /*showMap(json)*/})
    .catch(error => showError(error));

    function showError(x){
        console.log(x);
    }

    function showTable(x){
        let table = document.createElement("table");
        let thead = table.createTHead()
        let row = thead.insertRow()
            
        x.sort(function(a,b) {
            return b.hoyde - a.hoyde;
        })
        
    }

    document.getElementById("test").onclick = () => console.log("hei");