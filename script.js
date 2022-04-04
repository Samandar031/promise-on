'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////

///////////////////////////////////////

const getCountryInfo = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    console.log(request);

    renderHtml(data);

    let border = data.borders;
    border.forEach(function (val) {
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${val}`);
      request2.send();
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(request2.responseText);
        renderHtml(data2, 'neighbour');
      });
    });
  });
};

function renderHtml(data, className) {
  let html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const errorXabar = function (response, msg) {
  if (!response.ok) {
    throw new Error(`${msg}  ${response.status} ${response.statusText}`);
  }
};

const qisqaJSON = function (url, msg) {
  return fetch(url).then(response => {
    errorXabar(response, msg);
    return response.json();
  });
};

const getCountryOne = function (country) {
  qisqaJSON(
    `https://restcountries.com/v2/name/${country}`,
    'bu davlatni topa olmadim'
  )
    .then(res => {
      let [data] = res;

      renderHtml(data);

      let border = data.borders[0];

      return qisqaJSON(
        `https://restcountries.com/v2/alpha/${border}`,
        "qo'shni davlatni topa olmadim"
      );
    })
    .then(res => {
      renderHtml(res);
    })
    .catch(error => {
      alert(error);
    })
    .finally(() => {
      alert('loadingni olib tashladim');
    });
};

// getCountryInfo('eng');

// BUGUNGI kunnni ishlari 4.04.2022

console.log('sync1');
setTimeout(() => {
  console.log('sync3');
});

Promise.resolve('promise').then(res => console.log(res));
console.log('sync2');

console.time('l');
// fetch('https://restcountries.com/v2/name/uzbekistan');
console.log('sync1');
setTimeout(() => {
  console.log('sync3');
});

Promise.resolve('promise').then(res => console.log(res));
console.log('sync2');
console.timeEnd('l');
