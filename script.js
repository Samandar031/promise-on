'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////

///////////////////////////////////////

const getCountryInfo = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);

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

// getCountryInfo('china');

const getCountryOne = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => {
        console.log(response.ok);

        if (!response.ok) {
          throw new Error(
            `kiritilga davlatni topa olmadim  ${response.status} ${response.statusText}`
          );
        }

        // 1.keladigan ma'lumotlarni deshifrlaydi va ozgin vaqt kutadi
        return response.json();
      }
      // ,
      // error => {
      //   alert(error);
      //   // 8.hatolardan saqlanib qolishning birinchi usuli
      // }
    )
    .then(res => {
      // 2.faqat arrayni o'zini olish uchun
      let [data] = res;
      // 3.buni olib chiqish uchun tashqaridan butta funksiya olib ichkariga tenglab qo'yamizda

      renderHtml(data);

      // 4.xato usulda borderslarni olib ko'ramiz chegaradoshlarini

      let border = data.borders[0];
      console.log(borders);

      // fetch(`https://restcountries.com/v2/alpha/${border}`)
      //   .then(response => {
      //     return response.json();
      //   })
      //   .then(res => {
      //     renderHtml(res, 'neighbour');
      //   });

      // 5.to'gri usulini ko'rib chiqamiz
      return fetch(`https://restcountries.com/v2/alpha/${border}`);
    })
    .then(responsive => {
      return responsive.json();
    })
    .then(res => {
      renderHtml(res);
    })
    .catch(error => {
      alert(error);
      // lyuboyini xatoni ushlab qoladi
    })
    .finally(() => {
      alert('loadingni olib tashladim');
    });
};

getCountryOne('uzbekistan');
