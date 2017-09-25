import { REQUEST_LIST_ANON } from '../constants/Short.constants.js';
import { SUCCESS_LIST_ANON } from '../constants/Short.constants.js';
import { INVALID_LIST_ANON } from '../constants/Short.constants.js';

let  initialState = {
	isFetching: false,
	didInvalid: false,
	listAnonUrl:[]
};

const reducerAnonListUrl = (state = initialState, action)=>{
	switch(action.type){
		case REQUEST_LIST_ANON:{
			return {...state,
				isFetching: true,
				didInvalid: false
			}
		}
		case SUCCESS_LIST_ANON:{
			return {...state,
				listAnonUrl:action.payload,
				isFetching: false,
				didInvalid: false
			}
		}
		case INVALID_LIST_ANON:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}
		default:{
			return state;
		}
	}
};

export default reducerAnonListUrl;