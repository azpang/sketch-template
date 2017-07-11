import {fromJS} from 'immutable';

import {
	SET_DATA,
} from './constants'


//reducers is the mechanism that allows you to change your store
//Look at "Actions" mechanism which allows people to execute different reducers
const initialState = fromJS({
	data:[]
});

function AppReducer(state=initialState, action){

	switch(action.type){
		case SET_DATA:
			return state
				.set('data', action.newData);
		default:
			return state
	}
}


export default AppReducer;