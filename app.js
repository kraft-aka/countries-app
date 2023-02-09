const list = [];
const rawJson = [];
const btn = document.querySelector('.btn')
// main url for all data
const url = 'https://restcountries.com/v3.1/all'


// const searchByName = async() => {
//   const name = document.querySelector('#input').value; 
//   console.log(name)
//   const urlByName = `https://restcountries.com/v2/name/${name}?fullText=true`;
//   try {
//     //e.preventDefault;
//     const response = await fetch(urlByName)
//     if (response.ok) {
//       const responseByName = await response.json();
//       console.log(responseByName)
//       getAllData(responseByName)
//     }
//   } catch(err) {
//     console.log(err)
//   }
// }


// placeholder div for output data
const output = document.querySelector('.output')

// fetches data from url
const fetchData = async (endpoint) => {
  try {

    const response = await fetch(endpoint);
    if(response.ok) {
      const responseJson = await response.json();
      //console.log(responseJson)
      // getRawData(responseJson)
      getAllData(responseJson)
      responseJson.forEach(item => rawJson.push(item))
      //console.log(rawJson)
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
// fix filter function

const searchCountryName = (e) => {
  const name = e.target.value.toLowerCase();
  const filteredList = rawJson.filter((countryItem)=> {
    console.log(countryItem.name.common.toLowerCase())
    countryItem.name.common.toLowerCase().includes(name)
  })
  output.innerHTML = ''
 filteredList.forEach(item => getAllData(item))
}


fetchData(url)
document.getElementById('input').addEventListener('input', searchCountryName)
