var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var chad;
var url='http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB4QFjAA&url=http%3A%2F%2Fworldmap.org%2Fmaps%2Fprepared%2Fchurchstatus%2Freunion%2FReunion%2520-%2520Bible%2520Translation%2520-%2520WorldMAP.kml&ei=AnuVVey3CMu4UfH-vYgC&usg=AFQjCNFJJgqFoRfnSCoWpgEUphKo19VCsw&sig2=RrGeXROAeA8irWG3jvYCHw&bvm=bv.96952980,d.d24';
//http://sites.google.com/site/kmlrunsense/reunion/%C3%AEledelaReunion.kml?attredirects=0&d=1;
var dep;
var ar;

 appelJSon=function()
    {
        var geojson=JSON.parse(document.getElementById('panel:json').value);
      
        map.data.addGeoJson(geojson);
    };
    additi = function(butiti)
    {
        chad = butiti;
    };
    


function zoom(map) {
  var bounds = new google.maps.LatLngBounds();
  map.data.forEach(function(feature) {
    processPoints(feature.getGeometry(), bounds.extend, bounds);
  });
  map.fitBounds(bounds);
}

function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function(g) {
      processPoints(g, callback, thisArg);
    });
  }
}

    
    

     
getAddressFromLatLong = function (latlng)
{
   
    var lat=latlng.lat();
    var lng=latlng.lng();
   var xhr_object = null;

                if(window.XMLHttpRequest) // Firefox
                   xhr_object = new XMLHttpRequest();
                else if(window.ActiveXObject) // Internet Explorer
                   xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
                else { // XMLHttpRequest non supporté par le navigateur
                   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest !!");
                   
                }
                
               
                xhr_object.open('GET', 'http://maps.googleapis.com/maps/api/geocode/xml?latlng='+lat+','+lng+'&sensor=false', false);
                xhr_object.send(null);
                if(xhr_object.readyState === 4)
                {
                
                     repiti = xhr_object.responseText;
                     //alert(repiti);
                     var tsplit = repiti.split('<formatted_address>');
                     if(tsplit!==null)
                         {
                             var tsplit = tsplit[1].split('</formatted_address>');
                             var ad=tsplit[0];
                             //alert(ad);
                             document.getElementById('panel:'+chad).value =ad;
                           
                         }
                     
                     
                   
                     
                    
                }
           
                
        
    };
    
    clickmap=function(pos)
    {
        
        getAddressFromLatLong(pos.latLng);
        calcRoute();
        map.setMapTypeId(google.maps.MapTypeId.HYBRID)
        
    };
function initialize() {
  //directionsDisplay = new google.maps.DirectionsRenderer();
 
  var mapOptions = {
    zoom:10,
    center: { lat: -21.137472, lng: 55.546906},
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

 // directionsDisplay.setMap(map);
  
  layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '1jKAPLk2NOAcc2NdZ1sixkH-Sim7LAQwLAvGJgKLt'
    },
    styles: [{
      polygonOptions: {
        fillColor: '#00FF00',
        fillOpacity: 0.3
      }
    }]
  });
  
  layer.setMap(map);

  google.maps.event.addListener(map, "click", function(event) {
            clickmap(event);
             
            });
}

function calcRoute() {

  var start = document.getElementById('panel:dep').value;
    var end = document.getElementById('panel:arv').value;
    
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
      
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
       zoom(map);
    }
  });
  directionsDisplay.setPanel(document.getElementById('panel'));
}

google.maps.event.addDomListener(window, 'load', initialize);
