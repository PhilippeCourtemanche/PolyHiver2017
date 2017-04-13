var map;
var listStations = {};
var listeNoms = [];
var donnesBixiPourDataTable = [];

$(document).ready(function () {
  initMap();
  loadData();
});


function chargerDataTable(donnesBixi){
  $('#example').DataTable({
    data : donnesBixi,
    columns:[
      {data : 'id'},
      {data : 'nom'},
      {data : 'nombreVDispo'},
      {data : 'nombreBDispo'},
      {data : 'estBloquee'},
      {data : 'estSuspendue'},
    ],
     "pagingType": "simple_numbers"
  });  
};


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {

    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

function loadData() {
  $.get('https://secure.bixi.com/data/stations.json')


    .done(function (data) {
    
    //on remplit donnesBixiPourDataTable specifiquement pour utilisation dans la dataTable
    for (var i = 0; i < data.stations.length; i++) 
    {
      donnesBixiPourDataTable[i] = 
      {
      "nom":         data.stations[i].s,
      "id":          data.stations[i].id,
      "estBloquee":     data.stations[i].b,
      "estSuspendue":   data.stations[i].su,
      "estHorsService":     data.stations[i].m,
      "nombreVDispo":    data.stations[i].ba,
      "nombreBDispo":   data.stations[i].da,
      "nombreVNDispo":  data.stations[i].bx,
      "nombreBNDispo": data.stations[i].dx,
      "latitude":     data.stations[i].la,
      "longitude":    data.stations[i].lo
      };
    }
    chargerDataTable(donnesBixiPourDataTable);  

      //pour utilisation dans le premier onglet
    data.stations.forEach(function (element) {
      var station = createStation(element);
      listStations[station.nom] = station;
      listeNoms.push(station.nom);
      }, this);
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
    'latitude': infoStation.la,
    'longitude': infoStation.lo,
  }
}

$(function autoCompletion() {
  $("#tags").autocomplete({
    source: listeNoms,
    select: function (event, ui) {
      document.getElementById("resultat").innerHTML = ui.item.value;

      //mettre à jour le tableau
      document.getElementById("IDStation").innerHTML = listStations[ui.item.value].id;
      document.getElementById("nombreVDispo").innerHTML = listStations[ui.item.value].nombreVDispo;
      document.getElementById("estBloquee").innerHTML = listStations[ui.item.value].estBloquee ? 'Oui' : 'Non';
      document.getElementById("nombreBornesDispo").innerHTML = listStations[ui.item.value].nombreBDispo;
      document.getElementById("estSuspendue").innerHTML = listStations[ui.item.value].estSuspendue ? 'Oui' : 'Non';
      document.getElementById("nombreVIndispo").innerHTML = listStations[ui.item.value].nombreVNDispo;
      document.getElementById("estHorsService").innerHTML = listStations[ui.item.value].estHorsService ? 'Oui' : 'Non';
      document.getElementById("nombreBornesIndispo").innerHTML = listStations[ui.item.value].nombreBDispo;

      //mise a jour des couleurs dans le tableau
      document.getElementById("nombreVDispo").style.backgroundColor = listStations[ui.item.value].nombreVDispo > 0 ? '#29B873': '#EE644C';
      document.getElementById("estBloquee").style.backgroundColor = listStations[ui.item.value].estBloquee ? '#EE644C': '#29B873';
      document.getElementById("estSuspendue").style.backgroundColor = listStations[ui.item.value].estSuspendue ? '#EE644C': '#29B873';
      document.getElementById("estHorsService").style.backgroundColor = listStations[ui.item.value].estHorsService ? '#EE644C': '#29B873';
      document.getElementById("nombreBornesDispo").style.backgroundColor = listStations[ui.item.value].nombreBornesDispo > 0 ? '#EE644C': '#29B873';

      //mise a jour de la carte
      var myCenter = new google.maps.LatLng(listStations[ui.item.value].latitude, listStations[ui.item.value].longitude);
      var mapCanvas = document.getElementById("map");
      var mapOptions = { center: myCenter, zoom: 15 };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var marker = new google.maps.Marker({ position: myCenter });
      marker.setMap(map);
    }
  });
});
