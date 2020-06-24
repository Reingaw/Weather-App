window.addEventListener("load",() => {
    let long;
    let lat;

    const tempDegree = document.querySelector('.temperature-degree');
    const timezone = document.querySelector('.location-timezone');
    const tempDescription = document.querySelector('.temperature-description');
    const icon = document.querySelector('img');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const apiKey = 'YOUR_API_KEY';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&lang=pt_br&units=metric`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    tempDegree.textContent = Math.round(data.main.temp);
                    timezone.textContent = data.name;
                    tempDescription.textContent = data.weather[0].description;
                    let iconId= data.weather[0].icon;
                    icon.setAttribute('src', `http://openweathermap.org/img/wn/${iconId}@2x.png`)
                });
        });
    }else {
        console.log("Ocorreu um erro!");
    }
    
});