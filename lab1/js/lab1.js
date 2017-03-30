  
  var map;
  var lat = 59.347; lng = 18.072;
  var myLoc = {lat: lat, lng: lng};
  var bLoc = {lat: 59.348, lng: 18.073};
  var zoomValue = 14;
  var infowindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLoc,
      zoom: zoomValue,
      //mapTypeId: google.maps.MapTypeId.ROADMAP
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      //mapTypeId: google.maps.MapTypeId.HYBRID
      disableDefaultUI: true
    });
    //map.setTilt(45);
    var marker = new google.maps.Marker({
      position: myLoc,
      draggable: true,
      map: map,
      animation: google.maps.Animation.DROP
    });

    var bouncer = new google.maps.Marker({
      position: bLoc,
      map: map,
      animation: google.maps.Animation.BOUNCE
    });
          
    infowindow = new google.maps.InfoWindow({
      content: '<div>'+
          '<h5>my location</h5>'+
          '</div>'
    });

  }

  function zoomIn() {
    zoomValue += 1;
    map.setZoom(zoomValue);
  }

  function zoomOut() {
    zoomValue -= 1;
    map.setZoom(zoomValue);
  }

      function clickLeft() {
    lng -=0.001 * Math.pow(2,14-zoomValue);
    myLoc = {lat: lat, lng: lng};
    map.setCenter(myLoc);
    //console.log(zoomValue);
  }

  function clickUp() {
    lat +=0.001 * Math.pow(2,14-zoomValue);
    myLoc = {lat: lat, lng: lng};
    map.setCenter(myLoc);
    //console.log(myLoc);
  }

  function clickRight() {
    lng +=0.001 * Math.pow(2,14-zoomValue);
    myLoc = {lat: lat, lng: lng};
    map.setCenter(myLoc);
  }

  function clickDown() {
    lat -=0.001 * Math.pow(2,14-zoomValue);
    myLoc = {lat: lat, lng: lng};
    map.setCenter(myLoc);
  }

  function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    }
    else {
      cancelFullScreen.call(doc);
    }
  }

//show geopositionn
  var x=document.getElementById("demo");
  function getLocation()
    {
    if (navigator.geolocation)
      {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
      }
    else{x.innerHTML="Geolocation is not supported by this browser.";}
    }

  function showPosition(position)
    {
    lat=position.coords.latitude;
    lng=position.coords.longitude;
    myLoc={lat: lat, lng: lng};
    map.setCenter(myLoc);
    var markerMyLoc = new google.maps.Marker({
      position: myLoc,
      draggable: true,
      map:map,
      title:"You are here!"
      });
    markerMyLoc.addListener('click', function() {
      infowindow.open(map, markerMyLoc);
    });
    }


  function showError(error)
    {
    switch(error.code) 
      {
      case error.PERMISSION_DENIED:
        x.innerHTML="User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML="Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML="The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML="An unknown error occurred."
        break;
      }
    }


