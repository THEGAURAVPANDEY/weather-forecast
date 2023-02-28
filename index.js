const temperatureField = document.querySelector(".weather1");
const CityField = document.querySelector(".weather2 p");
const DateField = document.querySelector(".weather2 span");
const EmojiField = document.querySelector(".weather3 img");
const WeatherField = document.querySelector(".weather3 span");
const searchbar = document.querySelector(".searchbar");
const form = document.querySelector("form");
let targetlocn = "jaipur";

const fetchdata = async (targetlocn) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=3abda05296234a6bb6651406232802&q=${targetlocn}`;
    const response = await fetch(url);
    const data = await response.json();

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    UpdateDom(temp_c, name, localtime, icon, text);
    function UpdateDom(temperature, city, time, emoji, text) {
      temperatureField.innerText = temperature;
      CityField.innerText = city;
      const exactTime = time.split(" ")[1];
      const exactDate = time.split(" ")[0];
      const exactDay = new Date(exactDate).getDay();
      //   console.log(getdayFullName());
      DateField.innerText = `${exactTime} - ${getdayFullName(
        exactDay
      )}  ${exactDate}`;
      //   console.log(exactTime);
      //   console.log(exactDate);

      EmojiField.src = emoji;
      WeatherField.innerText = text;
    }
  } catch (error) {
    alert("Location not found!!!");
  }
};

function UpdateDom(temperature, city, time, emoji, text) {
  temperatureField.innerText = temperature;
  CityField.innerText = city;
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();
  //   console.log(getdayFullName());
  DateField.innerText = `${exactTime} - ${getdayFullName(
    exactDay
  )}  ${exactDate}`;
  //   console.log(exactTime);
  //   console.log(exactDate);

  EmojiField.src = emoji;
  WeatherField.innerText = text;
}

fetchdata(targetlocn);

function getdayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Fridayday";
    case 6:
      return "Saturday";
    default:
      return "Anonnymous";
  }
}
const search = (e) => {
  e.preventDefault();
  targetlocn = searchbar.value;
  //   console.log(targetlocn);
  fetchdata(targetlocn);
};

form.addEventListener("submit", search);
