import reducerShortUrl from './shorten.reducers.js';
import reducerAnonListUrl from './listAnon.reducers.js';
import reducerDetailsUrl from './detailsUrl.reducer.js';
import reducerSignUser from './userSign.reducer.js';
import reducerProfile from './profileUser.reducer.js';
import { combineReducers } from 'redux';

export default combineReducers({
	reducerShortUrl,
	reducerAnonListUrl,
	reducerDetailsUrl,
	reducerSignUser,
	reducerProfile
});