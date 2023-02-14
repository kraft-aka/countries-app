const list = [];
const rawJson = [];
const btn = document.querySelector(".btn");
const lightModeBtnEl = document.querySelector('.light-mode');
// main url for all data
const url = "https://restcountries.com/v3.1/all";

// placeholder div for output data
const output = document.querySelector(".output");

// fetches data from url
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson);
      // getRawData(responseJson)
      getAllData(responseJson);
      responseJson.forEach((item) => rawJson.push(item));
      //console.log(rawJson)
    }
  } catch (err) {
    console.log(err);
  }
};

// displays raw data
const getRawData = (data) => {
  output.textContent = JSON.stringify(data, undefined, 2);
};

// displays clean data
const getAllData = (data) => {
  const country = data
    .map((item) => {
      return `
    <div id="country-item">
      <h2>${item.name.common}</h2>
      <hr/>
      <p>abbreviated: <strong>${item.cioc || item.name.common}</strong></p>
      <p>continent: <strong>${item.continents}</strong></p>
      <p>capital city: <strong> ${item.capital || ""}</strong></p>
      <p>area: <strong>${new Intl.NumberFormat().format(item.area)}</strong> km2</p>
      <p>borders: <strong>${item.borders || 'no borders'}</strong></p>
      <p>timezone: <strong> ${item.timezones[0]}</strong></p>
      <p>population: <strong>${new Intl.NumberFormat().format(item.population)}</strong></p>
      <p>independent: <strong>${item.independent}</strong></p>
      <p>flag: <img src='${item.flags.svg}' id="country-img" width="100px"/></p>
      <p><a href="${item.maps.googleMaps}">search it in google maps</a></p>  
      <button>more...</button>
    </div>`;
    })
    .join("");
  output.innerHTML = country;
};

const searchCountryName = (e) => {
  const name = e.target.value.toLowerCase();
  const filteredList = rawJson.filter((countryItem) => {
    return countryItem.name.common.toLowerCase().includes(name); //|| countryItem.capital.toLowerCase().includes(name)
  });

  output.innerHTML = "";
  getAllData(filteredList);
};
const toggleMode = () => {
  const body = document.body;
  const countryItem = document.querySelector('#country-item') 
  console.log(countryItem)
  body.classList.toggle('light-mode--active')
  output.classList.toggle('light-mode--active')
  countryItem.classList.toggle('light-mode--active')
}

fetchData(url);
document.getElementById("input").addEventListener("input", searchCountryName);

lightModeBtnEl.addEventListener('click', (e)=>{
  e.preventDefault();
  toggleMode()
})


//TODO --> create Modal for button, displaying ,mpre data about chosen country