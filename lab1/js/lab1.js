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

    var nationalparkmarker = new google.maps.Marker({
      position: new google.maps.LatLng(29.338308, 110.531989),
      draggable: false,
      map: map,
      title: 'Wulingyuan'
    });

    var infoString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">武陵源</h1>'+
            '<div id="bodyContent">'+ 'Wulingyuan (Chinese: 武陵源) is a scenic and historical site in south-central Chinas' +
            'Hunan Province. It was inscribed as a UNESCO World Heritage Site in 1992.[1] It is noted for more than 3,000' +
            'quartzite sandstone pillars and peaks across most of the site, many over 200 metres (660 ft) in height, along' +
            'with many ravines and gorges with attractive streams, pools, lakes, rivers and waterfalls.[1] It features 40 caves,' +
            'many with large calcite deposits, and two natural bridges, Xianrenqiao (Bridge of the Immortals) and Tianqiashengkong' +
            '(Bridge Across the Sky).' +
            '</div>'+
            '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: infoString
    });

    nationalparkmarker.addListener('click', function(){
      infoWindow.open(map,nationalparkmarker);
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


      function centerWulingyuan(){
        map.setCenter(new google.maps.LatLng(29.338308, 110.531989));
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
