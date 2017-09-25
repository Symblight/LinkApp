import { REQUEST_SHORTEN_URL } from '../constants/Short.constants.js';
import { SUCCESS_SHORTEN_URL } from '../constants/Short.constants.js';
import { INVALID_SHORTEN_URL } from '../constants/Short.constants.js';

let initialState = {
	url:{},
	didInvalid: false,
	isFetching: false,
};

const reducerShort = (state = initialState, action)=>{
	switch(action.type){
		case REQUEST_SHORTEN_URL:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_SHORTEN_URL:{
			return {...state,
				url: action.payload,
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_SHORTEN_URL:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}
		default:{
			return state;
		}
	}
}

export default reducerShort;