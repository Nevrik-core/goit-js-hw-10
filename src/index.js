import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

form.addEventListener('input', debounce(onTypeCountryName, DEBOUNCE_DELAY));

function onTypeCountryName(e) {
    const city = e.target.value.trim();
    console.log(city);
    fetchCountries(city).then(data => {
        if (data.length > 10) {
           Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (data.length === 1) {
            console.log(data.length);
            createInfoMarkup(data[0]);
        }
        
    });
        
}

function createInfoMarkup(obj) {
    
    const name = obj.name.official
    const capital = obj.capital[0];
    const flagIcon = obj.flag;
    const population = obj.population;
    const languages = Object.values(obj.languages).map(el => el).join(', ');
    const flag = obj.flags.svg;
    console.log(obj);
    
    countryInfo.innerHTML = `<div class="main">
        <img src="${flag}" alt="${name}${flagIcon}" height="30" />
        <h1>${name}</h1>
      </div>
      <ul>
        <li>
          <b>Capital:</b>
          ${capital}
        </li>
        <li><b>Population:</b> ${population}</li>
        <li><b>Languages:</b> ${languages}</li>
      </ul>`
}






