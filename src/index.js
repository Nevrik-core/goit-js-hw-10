import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');


const DEBOUNCE_DELAY = 300;

form.addEventListener('input', debounce(onTypeCountryName, DEBOUNCE_DELAY));




function onTypeCountryName(e) {
  const country = e.target.value.trim();
  

  if (!country || country === ``) {
    countryList.innerHTML = ``;
    return;
  }
    console.log(country);
    fetchCountries(country).then(data => {
      if (data.status === 404) {
         countryList.innerHTML = ``;
         Notiflix.Notify.failure(`Oops, there is no country with that name`);
  }
            createMarkup(data);
        
        
    }).catch(error => {
      
      Notiflix.Notify.failure(error);
      
});
        
}





function createMarkup(recivedCountryList) {
  console.log(recivedCountryList.length);

  if (recivedCountryList.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (recivedCountryList.length < 10 && recivedCountryList.length >= 2) {
    countryList.innerHTML = ``;

     
    const renderList = recivedCountryList
      .map(country =>
        `<li>
             <img src="${country.flags.svg}" alt="${country.flag}" width ="20">
             <span>${country.name.official}</span></li>`).join('');

    countryList.insertAdjacentHTML(`afterbegin`, renderList);
  }
  if (recivedCountryList.length === 1) {
    countryList.innerHTML = ``;

    const renderOneCountry = recivedCountryList
      .map(country => {
        const languages = Object.values(country.languages).map(el => el).join(', ');
        return `
 <li>
 <img src="${country.flags.svg}" alt="${country.flag}" width ="50">
 <span> ${country.name.official}</span>
 <p><b>Capital:</b> ${country.capital}</p>
 <p><b>Population:</b> ${country.population}</p>
 <p><b>Languages:</b> ${languages}</p>
 </li>
 `
      })
      .join('');

    countryList.insertAdjacentHTML(`afterbegin`, renderOneCountry);
  }
}