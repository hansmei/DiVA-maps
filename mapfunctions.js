var map;
var layers = [];
var kmlFiles = [];

var baseUrl = "https://raw.githubusercontent.com/hansmei/DiVA-maps/master/";
var municipality = "Hurdal";
var indexFile = "index.csv";
// var srcOriginal = baseUrl + municipality + "/VA-kart.kml";
// var srcSanitation = baseUrl + municipality + "/Saneringsbehov.kml";

/**
 * Initializes the map and calls the function that loads the KML layer.
 */
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(11.0, 60.0),
		zoom: 2,
		mapTypeId: 'terrain'
	});
	
	var previousGroup = "";
	kmlFiles.forEach(function(el, index){
		var source = baseUrl + municipality + "/" + el.File;
		
		console.log(el.Group);
		if(el.Visible == 1){
			layers[index] = new google.maps.KmlLayer(source, {
				preserveViewport: true,
				map: map
			});
		} else{
			layers[index] = new google.maps.KmlLayer(source, {
				preserveViewport: true,
				map: null
			});
		}
		
		if(previousGroup != el.Group){
			// Add a new group separator
			var separator = document.createElement('li');
			var htmlContent = 
				"<div class=\"separator\"\">" +
				el.Group +
				"</div>";
			separator.innerHTML = htmlContent;
			document.getElementById("leftmenu").appendChild(separator);
			
			previousGroup = el.Group;
		}
		
		var menuitem = document.createElement('li');
		var checked = el.Visible == 1 ? " checked=\"checked\"" : "";
		var htmlAdding = 
			"<div class=\"checkable\" onchange=\"toggleLayer(" + index + ")\">" +
			"<input type=\"checkbox\" id=\"checkbox" + index + "\" " + checked + "/>" +
			"<label for=\"checkbox" + index + "\">" + el.Title + "</label>" +
			"</div>";
		if(el.Description != ""){
			htmlAdding += "<span>" + el.Description + "</span>";
		}
			
		menuitem.innerHTML = htmlAdding;
		document.getElementById("leftmenu").appendChild(menuitem);
	});
	
	// layers[0] = new google.maps.KmlLayer(srcOriginal, {
		// preserveViewport: true,
		// map: map
	// });
	// layers[1] = new google.maps.KmlLayer(srcSanitation, {
		// preserveViewport: true,
		// map: null
	// });
	
	console.log("HER");
	
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

function loadMapData(){
    $.ajax({
        type: "GET",
        url: baseUrl + municipality + "/index.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = {};
            for (var j=0; j<headers.length; j++) {
                tarr[headers[j]] = data[j];
            }
            kmlFiles.push(tarr);
        }
    }
	initMap();
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