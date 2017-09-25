import { REQUEST_LIST_ANON } from '../constants/Short.constants.js';
import { SUCCESS_LIST_ANON } from '../constants/Short.constants.js';
import { INVALID_LIST_ANON } from '../constants/Short.constants.js';

import api from '../api/index.js';

const requestListAnon = () =>{
	return{
		type: REQUEST_LIST_ANON
	}
};

const successListAnon = (json) =>{
	return {
		type: SUCCESS_LIST_ANON,
		payload: json.data
	}
};

const invalidListAnon = () =>{
	return {
		type: INVALID_LIST_ANON
	}
};

export const fetchListAnon = () =>{
	return (dispatch) =>{
		dispatch(requestListAnon());
		return api.getListGuest()
			.then((res)=>{
				dispatch(successListAnon(res));
			})
			.catch((err)=>{
				dispatch(invalidListAnon());
			})
	}
}