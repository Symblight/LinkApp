import {
	REQUEST_USER_INFO,
	SUCCESS_USER_INFO,
	INVALID_USER_INFO
} from '../constants/profile.constants';

import api from '../api/index';

const requestUserInfo = () => {
	return {
		type: REQUEST_USER_INFO
	}
}

const successUserInfo = (json) => {
	return {
		type: SUCCESS_USER_INFO,
		payload: json.data
	}
}

const invalidUserInfo = () => {
	return {
		type: INVALID_USER_INFO
	}
}

export const fetchUserInfo = (token) => {
	return (dispatch) => {
		dispatch(requestUserInfo());
		return api.onProfile(token)
			.then((res)=>{
				dispatch(successUserInfo(res));
			})
			.catch((err)=>{
				dispatch(invalidUserInfo());
			});
	}
}