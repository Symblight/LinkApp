import {
	REQUEST_SHORT_LINK_USER,
	SUCCESS_SHORT_LINK_USER,
	INVALID_SHORT_LINK_USER
} from '../constants/profile.constants.js';

import api from '../api/index.js';

const requestShortUrlUser = () => {
	return {
		type: REQUEST_SHORT_LINK_USER
	}
}

const successShortLinkUser = (json) => {
	return {
		type: SUCCESS_SHORT_LINK_USER,
		payload: json.data
	}
}

const invalidShortLinkUser = () => {
	return {
		type: INVALID_SHORT_LINK_USER
	}
}

export const fetchShortUserLink = (data) => {
	return (dispatch) => {
		dispatch(requestShortUrlUser());
		return api.postShortUrlUser(data)
			.then((res)=>{
				dispatch(successShortLinkUser(res));
			})
			.catch((err)=>{
				dispatch(invalidShortLinkUser());
			})
	}
}