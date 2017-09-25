import { 
	REQUEST_GET_TITLE_LINK,
	SUCCESS_GET_TITLE_LINK,
	INVALID_GET_TITLE_LINK
} from '../constants/profile.constants.js';

import api from '../api/index.js';

const requestGetTitle = () => {
	return {
		type: REQUEST_GET_TITLE_LINK
	}
}

const successGetTitle = (json) => {
	return {
		type: SUCCESS_GET_TITLE_LINK,
		payload: json.data
	}
}

const invalidGetTitle = () => {
	return {
		type: INVALID_GET_TITLE_LINK
	}
}

export const fetchGetTitle = (data) => {
	return (dispatch) => {
		dispatch(requestGetTitle());
		return api.getTitle(data)
			.then((res)=>{
				dispatch(successGetTitle(res));
			})
			.catch((err)=>{
				dispatch(invalidGetTitle());
			})
	}
}