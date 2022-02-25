 fetch("fylkestopper.json")
    .then(response => response.json())
    .then(json => {showTable(json),showMap(json)})
    .catch(error => showError(error));

    function showError(error){
        document.getElementById("error").style.display = "block";
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

    var map = new OpenLayers.Map('map');
    map.addLayer(new OpenLayers.Layer.OSM())

    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //transformerer fra WGS84
    projectTo = map.getProjectionObject(); //transformerer til kartets koordinatsystem (sfærisk mercator)

    let lonLat = new OpenLayers.LonLat(9.6807076, 61.8223407).transform(epsg4326, projectTo); //Sentrum midt i norge
    map.setCenter(lonLat, 6);    

    let markers = new OpenLayers.Layer.Markers("Markers"); // Lag et nytt lag å lagre markørene i
    map.addLayer(markers);

    function showMap(fylkestopper) {
        for(let fylke of fylkestopper) {
            let lonlat = new OpenLayers.LonLat(fylke.long, fylke.lat).transform(epsg4326, projectTo); //Hent koordinatene fra fylkestopp-objektet og lag markør
            markers.addMarker(new OpenLayers.Marker(lonlat));
        }
    }
    // var map = new ol.Map({
    //     target: 'map',
    //     layers: [
    //       new ol.layer.Tile({
    //         source: new ol.source.OSM()
    //       }),
    //       new ol.layer.Tile({
    //           source: new ol.source.OSM()
    //       })
    //     ],
    //     view: new ol.View({
    //         // "lat": "60.13518", "long": "10.619047"
    //       center: ol.proj.fromLonLat([10.619047,60.13518]),
    //       zoom: 5
    //     })
    //   });