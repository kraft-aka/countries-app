// main url for all data
const url = 'https://restcountries.com/v3.1/all'

// placeholder div for output data
const output = document.querySelector('.output')

// fetches data from url
const fetchData = async (endpoint) => {
  try {

    const response = await fetch(endpoint);
    if(response.ok) {
      const responseJson = await response.json();
      console.log(responseJson)
      // getRawData(responseJson)
      getAllData(responseJson)
    }
  } catch(err) {
    console.log(err)
  }
};

// displays raw data
const getRawData = (data) => {
  output.textContent = JSON.stringify(data, undefined, 2)
}

// displays clean data
const getAllData = (data) => {
  const list =[];
  let country;
  data.forEach(item => {
   country = `<div id="country-item">
   <p>name: ${item.name.common}</p>
   <p>area: ${item.area}km2</p>
   <p>capital city: ${item.capital || ''}</p>
   <p>timezone: ${item.timezones}</p>
   <p>population: ${item.population}</p>
   <img src='${item.flags.svg}' id="country-img" width="100px"/> 
   </div>`
   list.push(country)
  })
  output.innerHTML = list.join('');

}
// TODO: 
// add styles
// add filter func and more search endpoints

fetchData(url)