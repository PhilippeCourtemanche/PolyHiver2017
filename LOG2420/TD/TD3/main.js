var map;
var listStations = {};

$(document).ready(function () {
  // ...
  // ...
  initMap();
  loadData();


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


      }, this);

        //creer un tableau pour l auto completion et etre capable de recuperer l objet a partir du nom


      console.log(Object.keys(listStations));


      // ...
      // ...
      //console.log(data.stations);


    })


}

function createStation(infoStation) {
  return station = {
    'id': infoStation.id,
    'nom': infoStation.s,
    'statut':infoStation.b,
    'etat':infoStation.su,
    'actif':infoStation.m,
    'VDispo':infoStation.ba,
    'BDispo':infoStation.da,
    'VNDispo':infoStation.bx,
    'BNDispo':infoStation.dx,
  }
}