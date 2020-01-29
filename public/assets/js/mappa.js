function popupStyle(nome, studenti) {
  return "<div style='width:100%; border-bottom:1px solid #1F375F; color:#1F375F; padding:0px'><b>"+nome+"</b></div>"
}
 
var customOptions =
    {
    'maxWidth': '400',
    'width': '200',
    'className' : 'popupCustom'
    }

 
 var map = L.map('map', {
          center: [45.4688323, 9.1783027],
          zoom: 12,
          gestureHandling: true

      });
      map.touchZoom.disable();
      map.scrollWheelZoom.disable();
      map.removeControl(map.zoomControl);
      var gl = L.mapboxGL({
        accessToken: 'not-needed',
        style: 'https://api.maptiler.com/maps/positron/style.json?key=4Cmlg3qrfDFt4FObQxZo'
      }).addTo(map);
      
      var Icon = L.icon({
        iconUrl: 'assets/img/map-icon.svg',

        iconSize:     [30, 45], // size of the icon
        iconAnchor:   [15, 44], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -45] // point from which the popup should open relative to the iconAnchor
    });

      var markerManzoni = L.marker([45.4599599, 9.1783027], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo ginnasio Alessandro Manzoni", 150), customOptions);
      var markerSeveri = L.marker([45.4826, 9.1560], {icon: Icon}).addTo(map).bindPopup(popupStyle("IIS Severi-Correnti", 150), customOptions);
      var markerLeonardo = L.marker([45.4630959, 9.2022463], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico Leonardo da Vinci", 150), customOptions);
      var markerParini = L.marker([45.4740981, 9.1886746], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Classico Giuseppe Parini", 150), customOptions);
      var markerVolta = L.marker([45.4796446, 9.2058847], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico Alessandro Volta", 150), customOptions).openPopup();
      var markerEinstein = L.marker([45.4505216, 9.215875], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico Albert Einstein", 150), customOptions);
      var markerConti = L.marker([45.4768383, 9.1417073], {icon: Icon}).addTo(map).bindPopup(popupStyle("IIS Ettore Conti", 150), customOptions);
      var markerDonatelli = L.marker([45.4629132, 9.2245457], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico Donatelli Pascal", 150), customOptions);
      var markerVittorini = L.marker([45.4539154, 9.1451304], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico Elio Vittorini", 150), customOptions);
      var markerBerchet = L.marker([45.4556666 , 9.1993217], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo classico Giovanni Berchet", 150), customOptions);
      var markerVVeneto = L.marker([45.4768383 , 9.1417073], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo scientifico Vittorio Veneto", 150), customOptions);
      var markerMarconi = L.marker([45.4506133 , 9.1271404], {icon: Icon}).addTo(map).bindPopup(popupStyle("Liceo Scientifico G. Marconi", 150), customOptions);