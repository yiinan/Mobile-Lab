// JavaScript code for the Arduino Beacon example app.

var mSensors = {
	1: {
	"key":"BQa4EqqbgxfMgpBQ8XwNhvP82Dj",
	"image":"https://evothings.com/demos/dome_pics/IMG_1758.JPG"},
	2: {
	"key":"J3Wgj9qegGFX4r9KlxxGfaeMXQB",
	"image":"https://evothings.com/demos/dome_pics/IMG_1759.JPG"},
	3: {
	"key":"lB6p49pzXdFGQjpLwzzOTWj10rd",
	"image":"https://evothings.com/demos/dome_pics/IMG_1762.JPG"},
	4: {
	"key":"L4D98lO9ObtOdzx3PggKIaWmMGA",
	"image":"https://evothings.com/demos/dome_pics/IMG_1763.JPG"},
	5: {
	"key":"LAjQ9E8PBOiOdzx3PggKIaWmMGA",
	"image":"https://evothings.com/demos/dome_pics/IMG_1761.JPG"},
	6: {
	"key":"BkPNOapq2WSMgpVlNQQKFYXPBWr",
	"image":"https://evothings.com/demos/dome_pics/IMG_1760.JPG"}
};

function getJSON(){
	if (window.cordova){
		console.log('Using the Cordova HTTP GET function');
		cordovaHTTP.get(
			mSensorDataURL + sensor.key +
			'.json?gt[timestamp]=now-1day&page=1',
			function (response){
				if (response){
					sensor.data = JSON.parse(response.data)[0];
					sensor.fullData = JSON.parse(response.data);
					printData();
				}
			},
			function (error){
				console.log(JSON.stringify(error));
			});
		}
		else{
			console.log('Not using Cordova, fallback to AJAX via jquery');
			$.ajax({
				url: mSensorDataURL + sensor.key
				+ ".json?gt[timestamp]=now- 1day",
				jsonp: "callback",
				cache: true,
				dataType: "jsonp",
				data:
				{
					page: 1
				},
				success: function(response){
					if (response && response[0])
					{
						sensor.data = response[0];
						sensor.fullData = response;
						printData();
					}
				}
			});
	}
