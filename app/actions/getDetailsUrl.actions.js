import { REQUEST_DETAILS_URL } from '../constants/Short.constants.js';
import { SUCCESS_DETAILS_URL } from '../constants/Short.constants.js';
import { INVALID_DETAILS_URL } from '../constants/Short.constants.js';

import api from '../api/index.js';

const requestDetailsUrl = () =>{
	return {
		type: REQUEST_DETAILS_URL
	}
}

const successDetailsUrl = (json) => {
	return {
		type: SUCCESS_DETAILS_URL,
		payload: json.data
	}
}

const invalidDetailsUrl = () =>{
	return {
		type: INVALID_DETAILS_URL,
	}
}

export const fetchDetailsUrl = (id) => {
	return (dispatch) => {
		dispatch(requestDetailsUrl());
		return api.getDetailsUrl(id)
			.then((res)=>{
				dispatch(successDetailsUrl(res));
			})
			.catch((err)=>{
				dispatch(invalidDetailsUrl());
			})
	}
}