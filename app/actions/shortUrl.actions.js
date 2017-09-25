import { REQUEST_SHORTEN_URL } from '../constants/Short.constants.js';
import { SUCCESS_SHORTEN_URL } from '../constants/Short.constants.js';
import { INVALID_SHORTEN_URL } from '../constants/Short.constants.js';

import api from '../api/index.js';

const requestShortenUrl = ()=>{
	return {
		type: REQUEST_SHORTEN_URL,
	}
}

const successShortenUrl = (json)=>{
	return {
		type: REQUEST_SHORTEN_URL,
		payload: json.data
	}
}

const invalidShortenUrl = ()=>{
	return {
		type: REQUEST_SHORTEN_URL,
	}
}

export const fetchShortenUrl = (url)=>{
	return (dispatch)=>{
		dispatch(requestShortenUrl());
		return api.postShortUrl(url)
			.then((res)=>{
				dispatch(successShortenUrl(res));
			})
			.catch((err)=>{
				dispatch(invalidShortenUrl())
			})
	}
}