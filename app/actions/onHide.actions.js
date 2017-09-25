import { 
	REQUEST_HIDE_LINKS,
	SUCCESS_HIDE_LINKS,
	INVALID_HIDE_LINKS
} from '../constants/profile.constants.js';

import api from '../api/index.js';

const requestHideLink = () => {
	return {
		type:REQUEST_HIDE_LINKS
	}
};

const successHideLink = (json) => {
	return {
		type: SUCCESS_HIDE_LINKS,
		payload: json.data
	}
};

const invalidHideLink = () => {
	return {
		type: INVALID_HIDE_LINKS
	}
};

export const fetchHideLink = (data) => {
	return (dispatch) => {
		dispatch(requestHideLink());
		return api.onHiddenLinks(data)
			.then((res)=>{
				dispatch(successHideLink(res));
			})
			.catch((err)=>{
				dispatch(invalidHideLink());
			})
	}
};