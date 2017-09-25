import { 
	REQUEST_LOGIN_USER,
	SUCCESS_LOGIN_USER,
	INVALID_LOGIN_USER
} from '../constants/sign.constants';

import api from '../api/index.js';

const requestLogin = () => {
	return{
		type: REQUEST_LOGIN_USER
	}
}

const successLogin = (json) => {
	return {
		type: SUCCESS_LOGIN_USER,
		payload: json.data
	}
}

const invalidLogin = (json) => {
	return{
		type: INVALID_LOGIN_USER,
		payload:json
	}
}

export const fetchLoginUser = (data) => {
	return (dispatch) => {
		dispatch(requestLogin());
		return api.onSignIn(data)
			.then((res)=>{
				dispatch(successLogin(res));
			})
			.catch((err)=>{
				dispatch(invalidLogin(err.response.data.errors));
			})
	}
}