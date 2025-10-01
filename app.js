let apikey = "_API_KEY_";

function loadWeatherData(searchval){
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${searchval}`)
    .then(res => res.json())
    .then(data => {
        document.getElementById('root').innerHTML = `
        <section class="bg-white rounded-2xl shadow-xl p-6 text-gray-800 flex flex-col items-center">
            <img src="${data.current.condition.icon}" alt="weather icon" class="w-20 h-20">
            <h2 class="text-2xl font-bold mt-2">${data.location.name}, ${data.location.country}</h2>
            <p class="text-lg text-gray-600 mt-1">${data.current.condition.text}</p>
            <p class="text-4xl font-extrabold mt-4">${data.current.temp_c}°C</p>
        </section>`;
        console.log(data);
    })
    .catch(err => {
        document.getElementById('root').innerHTML = `
        <p class="text-red-200 bg-red-600 p-3 rounded-lg"> Error: City not found!</p>`;
    });
}

function searchByCity(){
    let searchval = document.getElementById('txtSearchInput').value;
    if(searchval.trim() !== ""){
        loadWeatherData(searchval);
    }
}

function getgeolocation(){
    navigator.geolocation.getCurrentPosition(showposition);
}

function showposition(position){
    loadWeatherData(position.coords.latitude + "," + position.coords.longitude);
}

getgeolocation();
