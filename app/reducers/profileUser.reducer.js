import {
	REQUEST_USER_INFO,
	SUCCESS_USER_INFO,
	INVALID_USER_INFO,

	REQUEST_LINK_USER,
	SUCCESS_LINK_USER,
	INVALID_LINK_USER,

	REQUEST_SHORT_LINK_USER,
	SUCCESS_SHORT_LINK_USER,
	INVALID_SHORT_LINK_USER, 

	REQUEST_GET_TITLE_LINK,
	SUCCESS_GET_TITLE_LINK,
	INVALID_GET_TITLE_LINK,

	REQUEST_HIDE_LINKS,
	SUCCESS_HIDE_LINKS,
	INVALID_HIDE_LINKS
} from '../constants/profile.constants';

let initialState = {
	user: {},
	token: '',
	links: [],
	length: 0,
	isFetching: false,
	didInvalid: false,
}

const reducerProfile = (state = initialState, action) => {
	switch(action.type){

		/* USER INFO  */
		case REQUEST_USER_INFO:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_USER_INFO:{
			return {...state,
				user:action.payload,
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_USER_INFO:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}

		/* LIST HISTORY */
		case REQUEST_LINK_USER:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_LINK_USER:{
			let link = state.links;
			link.push(action.payload);
			return {...state,
				links:action.payload,
				length: action.payload.length,
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_LINK_USER:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}

		/* SHORT LINK */
		case REQUEST_SHORT_LINK_USER:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_SHORT_LINK_USER:{
			return {...state,
				links:[
					...state.links,
					action.payload
				],
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_SHORT_LINK_USER:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}

		/*GET TITLE*/
		case REQUEST_GET_TITLE_LINK:{
			return {...state,
				isFetching: true,
                didInvalid: false
			}
		}
		case SUCCESS_GET_TITLE_LINK:{
			let _links = state.links;
			_links[0].title = action.payload.title;
			return {...state,
				links:_links,
				isFetching: false,
                didInvalid: false
			}
		}
		case INVALID_GET_TITLE_LINK:{
			return {...state,
				isFetching: false,
                didInvalid: true
			}
		}

		/*HIDE LINKS*/
		case REQUEST_HIDE_LINKS:{
			return {...state,
				isFetching: true,
				didInvalid: false
			}
		}
		case SUCCESS_HIDE_LINKS:{
			return {...state,
				links: action.payload,
				isFetching:false,
				didInvalid: false
			}
		}
		case INVALID_HIDE_LINKS:{
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

export default reducerProfile;