import { 
	REQUEST_SIGNUP_USER,
	SUCCESS_SIGNUP_USER,
	INVALID_SIGNUP_USER
} from '../constants/sign.constants';

import api from '../api/index.js';

const requestSignUp = () => {
	return{
		type: REQUEST_SIGNUP_USER
	}
}

const successSignUp = (json) => {
	return {
		type: SUCCESS_SIGNUP_USER,
		payload: json.data
	}
}

const invalidSignUp = (json) => {
	return{
		type: INVALID_SIGNUP_USER,
		payload:json.msg
	}
}

export const fetchSignUpUser = (data) => {
	return (dispatch) => {
		dispatch(requestSignUp());
		return api.onSignUp(data)
			.then((res) => {
				dispatch(successSignUp(res));
			})
			.catch((err) => {
				dispatch(invalidSignUp(err.response.data.errors));
			})
	}
}