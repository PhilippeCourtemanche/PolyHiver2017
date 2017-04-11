var map;
var listStations = {};
var listeNoms = [];

$(document).ready(function () {
  // ...
  // ...
  initMap();
  loadData();
  //autoCompletion();


});




function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {

    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

function loadData() {
  $.get('https://secure.bixi.com/data/stations.json')


    .done(function (data) {
      data.stations.forEach(function (element) {
        var station = createStation(element);
        listStations[station.nom] = station;
        listeNoms.push(station.nom);
        //console.log(listStations[station.nom].nom);
      }, this);
      
      //creer un tableau pour l auto completion et etre capable de recuperer l objet a partir du nom

      //console.log(Object.keys(listStations));


      // ...
      // ...
      //console.log(data.stations);


    })


}

function createStation(infoStation) {
  return station = {
    'id': infoStation.id,
    'nom': infoStation.s,
    'estBloquee': infoStation.b,
    'estSuspendue': infoStation.su,
    'estHorsService': infoStation.m,
    'nombreVDispo': infoStation.ba,
    'nombreBDispo': infoStation.da,
    'nombreVNDispo': infoStation.bx,
    'nombreBNDispo': infoStation.dx,
  }
}

$(function autoCompletion() {
  $("#tags").autocomplete({
    source: listeNoms,
    select: function( event, ui ) {
    document.getElementById("resultat").innerHTML = ui.item.value;

    //mettre à jour le tableau
    document.getElementById("IDStation").innerHTML = listStations[ui.item.value].id;
    document.getElementById("nombreVDispo").innerHTML = listStations[ui.item.value].nombreVDispo;
    document.getElementById("estBloquee").innerHTML = listStations[ui.item.value].estBloquee;
    document.getElementById("nombreBornesDispo").innerHTML = listStations[ui.item.value].nombreBDispo;
    document.getElementById("estSuspendue").innerHTML = listStations[ui.item.value].estSuspendue;
    document.getElementById("nombreVIndispo").innerHTML = listStations[ui.item.value].nombreVNDispo;
    document.getElementById("estHorsService").innerHTML = listStations[ui.item.value].estHorsService;
    document.getElementById("nombreBornesIndispo").innerHTML = listStations[ui.item.value].nombreBDispo;

   
  }
    
  });

});
