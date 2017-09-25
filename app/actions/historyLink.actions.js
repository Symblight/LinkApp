import {
	REQUEST_LINK_USER,
	SUCCESS_LINK_USER,
	INVALID_LINK_USER
} from '../constants/profile.constants';

import api from '../api/index';

const requestHistoryLinks = () => {
	return {
		type: REQUEST_LINK_USER
	}
}

const successHistoryLinks = (json) => {
	return {
		type: SUCCESS_LINK_USER,
		payload: json.data
	}
}

const invalidHistoryLinks = () => {
	return {
		type: INVALID_LINK_USER
	}
}

export const fetchHistoryLinks = (token) => {
	return (dispatch) => {
		dispatch(requestHistoryLinks());
		return api.getHistoryLinks(token)
			.then((res)=>{
				dispatch(successHistoryLinks(res));
			})
			.catch((err)=>{
				dispatch(invalidHistoryLinks());
			})
	}
}