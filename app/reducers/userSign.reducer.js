import { 
	REQUEST_SIGNUP_USER,
	SUCCESS_SIGNUP_USER,
	INVALID_SIGNUP_USER,
	REQUEST_LOGIN_USER,
	SUCCESS_LOGIN_USER,
	INVALID_LOGIN_USER
} from '../constants/sign.constants';

let initialState = {
	userInfo:{
		user:{
			username 	:'',
			email 		:'',
			firstname 	:'',
			lastname	:''
		},
		token:'',
	},
	errors:{},
	didInvalid: false,
	isFetching: false,
}

const reducerSignUser = (state = initialState, action) => {
	switch(action.type){
		case REQUEST_SIGNUP_USER:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_SIGNUP_USER:{
			return {...state,
				userInfo: action.payload,
				errors: '',
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_SIGNUP_USER:{
			return {...state,
				errors: action.payload,
				isFetching: false,
                didInvalid: true
			}
		}
		case REQUEST_LOGIN_USER:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_LOGIN_USER:{
			return {...state,
				userInfo: action.payload,
				errors: '',
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_LOGIN_USER:{
			return {...state,
				errors: action.payload,
				isFetching: false,
                didInvalid: true
			}
		}
		default:{
			return state;
		}
	}
}

export default reducerSignUser;