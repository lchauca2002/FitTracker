mapboxgl.accessToken = mapToken;
let userCoordinates = [];
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true })

function successLocation(position) {
    console.log(position);
    userCoordinates = [position.coords.longitude, position.coords.latitude];
    setupMap([position.coords.longitude, position.coords.latitude]);
}
function errorLocation() {

}
function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 14
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    // Add the control to the map.
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for places',
    });
    map.addControl(geocoder, 'top-left');

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
    );

    let markers = [];

    let typingTimer;
    const doneTypingInterval = 1000; // in milliseconds

    const inputField = document.querySelector('.mapboxgl-ctrl-geocoder--input');

    inputField.addEventListener('keyup', function (e) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
            fetchSearchResults(inputField.value, userCoordinates);
        }, doneTypingInterval);
    });

    function fetchSearchResults(searchText, userCoordinates = []) {
        const limit = 10;
        let proximity = "";

        if (userCoordinates.length === 2) {
            proximity = userCoordinates.join(',');
        }

        const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json?access_token=${mapToken}&limit=${limit}&proximity=${proximity}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const filteredResults = data.features.filter(feature => {
                    return feature.properties.category;
                });

                console.log('Filtered Search Results:', filteredResults);

                markers.forEach(marker => marker.remove());

                filteredResults.forEach(result => {
                    const marker = new mapboxgl.Marker({
                        color: 'orange'
                    })
                        .setLngLat(result.geometry.coordinates)
                        .addTo(map);
                    markers.push(marker);
                });
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }
}
