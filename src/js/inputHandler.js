import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import country from '../templates/country.hbs';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';


const input = document.querySelector('#search_input');
const resultList = document.querySelector('#result_list');
//const resultCard = document.querySelector('#result_card');

const handleChange = (e) => {
    resultList.innerHTML = ""
    if (!e.target.value) return

    fetchCountries(e.target.value).then(countries => {
        
        
        if (countries.length === 1) {
            resultList.innerHTML = country(countries[0]);
        } else if (countries.length > 10) {
            PNotify.defaults.styling = 'material';
            PNotify.error({
                title: 'Too many results!',
                text: 'Please make more precise input, too many countries match the query',
            })
        } else {
            countries.forEach(country => {
                const li = document.createElement('li')
                li.innerHTML = country.name
                resultList.appendChild(li)
            });
        }
    })
}

input.addEventListener('input', debounce(handleChange, 500));





