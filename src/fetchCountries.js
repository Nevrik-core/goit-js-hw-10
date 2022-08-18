
const base = "https://restcountries.com/v3.1/";
const endpoint = 'name/';

export const fetchCountries = function (name) {
    
    const response = fetch(`${base}${endpoint}${name}?fields=name,capital,population,flags,flag,languages`)
        .then(response => response.json());
    return response;
};

