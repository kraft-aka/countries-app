const url = 'https://restcountries.com/v3.1/all'

const fetchData = async (endpoint) => {
  const response = await fetch(endpoint);
  if(response.ok) {
    const responseJson = await response.json();
    console.log(responseJson)
    getRawData(responseJson)
  }
};

const getRawData = (data) => {
  const output = document.querySelector('.output')
  output.textContent = JSON.stringify(data, undefined, 2)
}



fetchData(url)