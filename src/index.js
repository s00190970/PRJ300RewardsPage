import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './App';
import * as serviceWorker from './serviceWorker';
import './scripts/sameSizeDivs';

/*
let products2 = []
var Faker = require('./node_modules/Faker');
function buildFakeProducts() {
  return {
    name: faker.lorem.words,
    description: faker.random.catch_phrase_descriptor,
    picURL: faker.image.abstractImage,
    brand: {
        name: faker.company.companyName,
        picURL: faker.image.avatar
    },
    quantity: Math.random() * (50 - 10) + 10,
    remaining: Math.random() * (48 - 0) + 0,
    price: faker.random.number
  };
}

for(var i = 0; i < 14; i++) {
  products2.push(buildFakeProducts())
}
*/
ReactDOM.render(<Page userCoins="1200"></Page>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
