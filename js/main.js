async function weather(city) {
  try {
    let weath = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6a53b6c615924b24b81133712241506&q=${city}&days=3`
    );
    if (!weath.ok) {
      throw new Error("Weather data could not be retrieved.");
    }
    let result = await weath.json();
    display(result);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
weather("Barcelona");

let button = document.querySelector(".container button");
let input = document.querySelector(".container input");
button.addEventListener("click", () => {
  let city = input.value.trim();
  if (city) {
    weather(city);
  } else {
    Swal.fire({
      title: "Error!",
      text: "Please enter a city Name",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
});

let date = new Date();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day1 = dayNames[date.getDay()];
let day2 = dayNames[(date.getDay() + 1) % 7];
let day3 = dayNames[(date.getDay() + 2) % 7];
let disp = document.querySelector(".container .display");

function display(result) {
  disp.innerHTML = `
    <div class="today flex flex-col h-76 bg-slate-500">
      <div class="head p-2 flex items-center justify-between bg-slate-800 text-white">
        <h2>${day1}</h2>
        <h2>${result.forecast.forecastday[0].date}</h2>
      </div>
      <div class="body flex p-2 flex-col">
        <h2 class="text-white text-3xl text-left mb-3 font-bold">${result.location.name}</h2>
        <h1 class="text-6xl font-bold text-center mb-3 text-white">
          ${result.current.temp_c}°C
        </h1>
        <img src="${result.current.condition.icon}" alt="" class="w-28 place-self-center mb-3" />
        <h5 class="text-white mb-3 text-2xl font-semibold text-center">
          ${result.current.condition.text}
        </h5>
      </div>
    </div>
    <div class="tomorrow flex flex-col h-76 bg-slate-700">
      <div class="head p-2 flex items-center justify-between bg-slate-800 text-white">
        <h2>${day2}</h2>
        <h2>${result.forecast.forecastday[1].date}</h2>
      </div>
      <div class="body flex p-2 flex-col">
        <h2 class="text-white text-3xl text-left mb-3 font-bold">${result.location.name}</h2>
        <h1 class="text-6xl font-bold text-center mb-3 text-white">
          ${result.forecast.forecastday[1].day.maxtemp_c}°C
        </h1>
        <img src="${result.forecast.forecastday[1].day.condition.icon}" alt="" class="w-28 place-self-center mb-3" />
        <h5 class="text-white mb-3 text-2xl font-semibold text-center">
          ${result.forecast.forecastday[1].day.condition.text}
        </h5>
      </div>
    </div>
    <div class="day3 flex flex-col h-76 bg-slate-500">
      <div class="head p-2 flex items-center justify-between bg-slate-800 text-white">
        <h2>${day3}</h2>
        <h2>${result.forecast.forecastday[2].date}</h2>
      </div>
      <div class="body flex p-2 flex-col">
        <h2 class="text-white text-3xl text-left mb-3 font-bold">${result.location.name}</h2>
        <h1 class="text-6xl font-bold text-center mb-3 text-white">
          ${result.forecast.forecastday[2].day.maxtemp_c}°C
        </h1>
        <img src="${result.forecast.forecastday[2].day.condition.icon}" alt="" class="w-28 place-self-center mb-3" />
        <h5 class="text-white mb-3 text-2xl font-semibold text-center">
          ${result.forecast.forecastday[2].day.condition.text}
        </h5>
      </div>
    </div>
  `;
}
