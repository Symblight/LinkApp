import { REQUEST_DETAILS_URL } from '../constants/Short.constants.js';
import { SUCCESS_DETAILS_URL } from '../constants/Short.constants.js';
import { INVALID_DETAILS_URL } from '../constants/Short.constants.js';

let initialState = {
	isFetching: false,
	didInvalid: false,
	detailsUrl:{
		longUrl:'',
		shortUrl:'',
		createAt: '',
		details:{
			clicks: 0,
		}
	}
};

const reducerDetailsUrl = (state = initialState, action) => {
	switch(action.type){
		case REQUEST_DETAILS_URL:{
			return {...state,
				isFetching: true,
				didInvalid: false
			}
		}
		case SUCCESS_DETAILS_URL:{
			return {...state,
				isFetching: false,
				didInvalid: false,
				detailsUrl: action.payload[0]
			}
		}
		case INVALID_DETAILS_URL:{
			return {...state,
				isFetching: false,
				didInvalid: true
			}
		}
		default:{
			return state
		}
	}
}

export default reducerDetailsUrl;