import {createStore, combineReducers, applyMiddleware} from 'redux';
import AppReducer from './containers/App/reducer.js';

export function buildStore(initState={}){
	return createStore(AppReducer, initState);
}

export default createStore(
  combineReducers({
    app: AppReducer 
  }),
  {app:null}
);