import axios from 'axios';

export default{
	postShortUrl(url){
		return axios.post('/short', url);
	},
	getListGuest(){
		return axios.get('/list/data');
	},
	getDetailsUrl(id){
		return axios.get(`/sh/details/${id}`);
	},
	onSignIn(user){
		return axios.post(`/user/login`, user);
	},
	onSignUp(user){
		return axios.post(`/user/signup`, user)
	},
	onProfile(token){
		return axios.post(`/user/profile`, token);
	},
	getHistoryLinks(token){
		return axios.post('/user/link_history', token);
	},
	postShortUrlUser(data){
		return axios.post('/user/short', data);
	},
	getTitle(data){
		return axios.post('/user/title', data);
	},
	onHiddenLinks(data){
		return axios.post('/user/hide', data);
	}
}