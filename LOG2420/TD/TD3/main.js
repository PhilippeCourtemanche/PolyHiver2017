var map;
var listStations = {};
var listeNoms = [];
var tableauStationsDataTable = [];

var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

$(document).ready(function () {
  // ...
  // ...
  initMap();
  loadData();
  console.log(tableauStationsDataTable);
  console.log(dataSet);
  autoCompletion();
      $('#example').DataTable( {
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Office" },
            { title: "Extn." },
            { title: "Start date" },
            //{ title: "Salary" },
            //{ title: "Start date2" },
            //{ title: "Start date3" },
            { title: "Start date4" }
        ]
        
    } );

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
        
        tableauStationsDataTable.push([station.id, station.nom, station.estBloquee, station.estSuspendue, 
        station.estHorsService, station.nombreVDispo, station.nombreBDispo, station.nombreVNDispo, station.nombreBNDispo]);
        
        //tableauStationsDataTable.push([station]);
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
      document.getElementById("estBloquee").innerHTML = listStations[ui.item.value].estBloquee;
      document.getElementById("nombreBornesDispo").innerHTML = listStations[ui.item.value].nombreBDispo;
      document.getElementById("estSuspendue").innerHTML = listStations[ui.item.value].estSuspendue;
      document.getElementById("nombreVIndispo").innerHTML = listStations[ui.item.value].nombreVNDispo;
      document.getElementById("estHorsService").innerHTML = listStations[ui.item.value].estHorsService;
      document.getElementById("nombreBornesIndispo").innerHTML = listStations[ui.item.value].nombreBDispo;

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
