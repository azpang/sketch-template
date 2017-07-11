/* global document */
import 'babel-polyfill';
import 'babel-register';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {buildStore} from './store';
import Routes from './routes';

const el = document.createElement('div');
document.body.appendChild(el);

import cities from '../data/all_cities_lat_lng.json'
import commute from '../data/oakland.csv'
import counties from '../data/counties_lat_lng.csv'


//Creates the initial Store
//To understand stores read
//http://redux.js.org/docs/api/Store.html
const initialState = {
	data:{
		counties,
		cities,
		commute
	}
};

//Go to the store.js file to understand how the store is made
const initStore = buildStore(initialState)

//Provider is the component from redux that allows the redux store to be exposed to the React components
//Import Routes file here, and your application will be rendered
ReactDOM.render(
  <Provider store={initStore} >
    <Routes />
  </Provider>,
  el
);