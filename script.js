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

// console.log('sync1');
// setTimeout(() => {
//   console.log('sync3');
// });

// Promise.resolve('promise').then(res => console.log(res));
// console.log('sync2');

// console.time('l');
// // fetch('https://restcountries.com/v2/name/uzbekistan');
// console.log('sync1');
// setTimeout(() => {
//   console.log('sync3');
// });

// Promise.resolve('promise').then(res => console.log(res));
// console.log('sync2');
// console.timeEnd('l');

// const tanga = new Promise(function (resolve, reject) {
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('siz ytdingiz');
//     } else {
//       reject('siz yutqazdingiz');
//     }
//   }, 2000);
// });

// tanga.then(
//   res => console.log(res),
//   err => console.log(err)
// );

// let getPos = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(
//       function (e) {
//         resolve(e);
//       },
//       function () {
//         reject(new Error('Joylashuvni topa olmadim'));
//       }
//     );
//   });
// };
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const data = async function () {
//   try{
//     console.log(position);

//     let data2 = await fetch('https://restcountries.com/v2/name/uzbekistan');
//     // console.log(data2);

//     let [body] = await data2.json();

//     console.log(body);

//     renderHtml(body);

//     let border = body.borders[2];
//     let chegaradosh = await fetch(`https://restcountries.com/v2/alpha/${border}`);

//     console.log(chegaradosh);

//     let chegaradoshD = await chegaradosh.json();

//     renderHtml(chegaradoshD);
//     console.log(chegaradoshD, 'neighbour');

//   }catch(err => {
//     alert(err)
//   }
// };

// data();

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const func = async function () {
//   const data = await fetch('https://restcountries.com/v2/name/uzbekistan');

//   const data2 = await data.json();
//   return data2;
// };

// func().then(res => console.log(res));

const getItem = async function () {
  // let con1 = await fetch('https://restcountries.com/v2/name/uzbekistan');
  // let json1 = await con1.json();

  // let con2 = await fetch('https://restcountries.com/v2/name/usa');
  // let json2 = await con2.json();

  // let con3 = await fetch('https://restcountries.com/v2/name/russia');
  // let json3 = await con3.json();

  // console.log(json1, json2, json3);

  const yil = Promise.all([
    fetch('https://restcountries.com/v2/name/russia'),
    fetch('https://restcountries.com/v2/name/usa'),
    fetch('https://restcountries.com/v2/name/uzbekistan'),
    fetch('https://restcountries.com/v2/name/russia'),
    fetch('https://restcountries.com/v2/name/usa'),
    fetch('https://restcountries.com/v2/name/uzbekistan'),
    fetch('https://restcountries.com/v2/name/uzbekistan'),
  ]);

  let time = function (sec) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve('senda internet vashshe rasvo');
      }, sec * 1000);
    });
  };

  const data2 = await Promise.race([yil, time(0.2)]);

  console.log(data2);
};

getItem();

const arr = [1, 2, 3, 4, 5, 6];

let str = arr
  .filter(val => {
    val > 2;
  })
  .map(val => {
    val * 10;
  })
  .reduce((yig, val) => {
    return yig + val;
  });

console.log(str);
