const API_KEY = "AIzaSyDGvBETzItQ1g8J1iPdIsmAi7coHG7_frM"

//** Renders map via google maps js API and adds home marker*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 59.334591,
            lng: 18.063240,
        }
    });
    new google.maps.Marker({
        position: {
            lat: 59.34222271014225,
            lng: 17.93553904348374
        },
        map,
        title: "Home!",
    });
}