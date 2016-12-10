var map;
var layers = [];

var baseUrl = "https://raw.githubusercontent.com/hansmei/DiVA-maps/master/";
var municipality = "Hurdal";
var indexFile = "index.csv";
var srcOriginal = baseUrl + municipality + "/VA-kart.kml";
var srcSanitation = baseUrl + municipality + "/Saneringsbehov.kml";

/**
 * Initializes the map and calls the function that loads the KML layer.
 */
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(11.0, 60.0),
		zoom: 2,
		mapTypeId: 'terrain'
	});
	
	
	
	layers[0] = new google.maps.KmlLayer(srcOriginal, {
		preserveViewport: true,
		map: map
	});
	layers[1] = new google.maps.KmlLayer(srcSanitation, {
		preserveViewport: true,
		map: null
	});
	
	google.maps.event.addListenerOnce(map, 'idle', function () {
		// map is ready
		var bounds = layers[0].getDefaultViewport();
		map.fitBounds(bounds);
		//map.setCenter(bounds.getCenter());
	});

  // loadKmlLayer(srcOriginal, map, false);
  // loadKmlLayer(srcSanitation, map);
}

function toggleLayer(i) {
	if(layers[i].getMap() === null) {
		layers[i].setMap(map);
	}
	else {
		layers[i].setMap(null);
	}
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: baseUrl + municipality + "/index.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }
    console.log(lines);
}

// function loadMap(kmlFileName){
	// var src = baseUrl + municipality + "/" + kmlFileName + ".kml";
	// console.log(src);
	// loadKmlLayer(src, map, true);
// }

// /**
 // * Adds a KMLLayer based on the URL passed. Clicking on a marker
 // * results in the balloon content being loaded into the right-hand div.
 // * @param {string} src A URL for a KML file.
 // */
// function loadKmlLayer(src, map, preserveViewport) {
  // var kmlLayer = new google.maps.KmlLayer(src, {
	// suppressInfoWindows: true,
	// preserveViewport: preserveViewport,
	// map: map
  // });
  // // <!-- google.maps.event.addListener(kmlLayer, 'click', function(event) { -->
	// // <!-- var content = event.featureData.infoWindowHtml; -->
	// // <!-- var testimonial = document.getElementById('capture'); -->
	// // <!-- testimonial.innerHTML = content; -->
  // // <!-- }); -->
// }