const countryList = document.getElementById("countryList");
const searchBar = document.getElementById("searchBar");
const sortCountryPop = document.getElementById("sortCountries");
const loadingSpinner = document.querySelector('.country__loading--spinner');
const btnSearch = document.querySelector('.search__icon');
const btnShowAll = document.querySelector('.btn__show');

let countryData = [];
let filteredAndSortedCountries = [];


// API call to display countries
const fetchAndDisplayCountries = async () => {
  try {
    loadingSpinner.style.display = 'block';
    const res = await fetch("https://api.sampleapis.com/countries/countries");
    countryData = await res.json();
    
    const searchString = searchBar.value.toLowerCase();
    const filteredCountries = countryData.filter((country) => {
      return country.name.toLowerCase().startsWith(searchString);
    });

    if (filteredCountries.length > 0) {
      sortCountryPop.style.display = 'block';
    } else {
      sortCountryPop.style.display = 'none';
    }
    
    if (sortCountryPop.value === 'A_TO_Z') {
      filteredCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCountryPop.value === 'Z_TO_A') {
      filteredCountries.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    filteredAndSortedCountries = filteredCountries; 
    displayCountries(filteredAndSortedCountries);


  } catch (err) {
    console.log(err);
  } finally {
    loadingSpinner.style.display = 'none';
  }
};


// show all button
const fetchAndDisplayAllCountries = async () => {
  try {
    loadingSpinner.style.display = 'block';
    const res = await fetch("https://api.sampleapis.com/countries/countries");
    countryData = await res.json();
  
    searchBar.value = ''; 
    sortCountryPop.value = ''; 
    
    sortCountryPop.style.display = 'block'; 
    
    displayCountries(countryData); 
  } catch (err) {
    console.log(err);
  } finally {
    loadingSpinner.style.display = 'none';
  }
};


// my functions

searchBar.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
    fetchAndDisplayCountries();
  }
});

btnSearch.addEventListener("click", () => {
  fetchAndDisplayCountries();
});

btnShowAll.addEventListener("click", () => {
  fetchAndDisplayAllCountries();
});

sortCountryPop.addEventListener("change", fetchAndDisplayCountries);
const displayCountries = (countries) => {
  if (countries.length === 0) {
    countryList.innerHTML = '<p>The country you searched does not exist</p>';
    return;
  }
  


// country html
  const htmlString = countries
    .map((country) => {
      return `<div class="country">
        <img class="country__img" src="${country.media.flag}" alt="" />
        <h4 class="country__name">${country.name}</h4>
        <p class="country__desc">Capital: ${country.capital}</p>
        <p class="country__desc">Population: ${country.population}</p>
        <p class="country__desc">Currency: ${country.currency}</p>
      </div>`;
    })
    .join("");
    
  countryList.innerHTML = htmlString;
};
