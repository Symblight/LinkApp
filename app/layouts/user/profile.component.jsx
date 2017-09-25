import React, { Component } from 'react';
import './profile.component.scss';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { fetchUserInfo } from '../../actions/profileInfo.actions';
import { fetchHistoryLinks } from '../../actions/historyLink.actions';
import { fetchShortUserLink } from '../../actions/shortUrlUser.actions';
import { fetchGetTitle } from '../../actions/getTitle.actions';
import { fetchHideLink } from '../../actions/onHide.actions';
import Auth from '../../modules/auth';

import HeaderComponent from './Header/header.component';
import HistoryLinks from './HistoryLinks/history.component';
import DescriptionLink from './Description/description.component';
import HideMenu from './HideMenu/hideMenu.components';

class ProfileComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			history_links:[],
			link:'',
			changeLink:{
				long_url:''
			},
			hideList:[]
		}

		this.onShortenLink 	= this.onShortenLink.bind(this);
		this.onChangeLink 	= this.onChangeLink.bind(this);
		this.onSelectItem 	= this.onSelectItem.bind(this);
		this.onChecked 		= this.onChecked.bind(this);
		this.onHideList 	= this.onHideList.bind(this);
	}

	onChangeLink(e){
		this.setState({link: e.target.value});
	}

	onShortenLink(e){
		e.preventDefault();

		const data = {
			long_url:this.state.link,
			token: Auth.getToken()
		};

		this.props.onShort(data)
			.then(()=>{
				this.props.onGetHistoryLinks(data).then(()=>{
					this.setState({history_links: this.props.storeProfile.links});

					let lst_item = this.props.storeProfile.links[0];
					data.short_url = lst_item.short_url

					this.props.getTitle(data);
					
					this.setState({changeLink: lst_item});
				});
			})
		this.setState({link: ''});
	}

	onChecked(e){
		let list = this.state.hideList;
		let item = list.find(el => el._id === e._id);
		if (!item){
			list.push(e);
		} else {
			let index = list.indexOf(item);
			list.splice(index, 1);		
		}
		this.setState({hideList: list});
	}

	componentWillMount(){
		const profile ={
			token: Auth.getToken()
		};

		this.props.onGetInfoUser(profile);
		this.props.onGetHistoryLinks(profile).then(()=>{
			this.setState({history_links: this.props.storeProfile.links});
			if (this.props.storeProfile.links[0])
			this.setState({changeLink: this.props.storeProfile.links[0]});
		});
	}

	onSelectItem(e){
		this.setState({changeLink: e});
	}

	onHideList(){
		const profile ={
			token: Auth.getToken(),
			listUser:this.state.hideList
		};
		this.props.onHide(profile)
			.then(()=>{
				this.setState({hideList:[],
								history_links:this.props.storeProfile.links,
								changeLink:this.props.storeProfile.links[0]
							});
			})
	}

	render(){
		return <div className="container-profile">
					<HeaderComponent
						onSubmit = { this.onShortenLink }
						onChange = { this.onChangeLink }
						Link = {this.state.link}
						UserInfo = {this.props.storeProfile.user}
					/>
					{
						<div className="container-info">
							<HistoryLinks 
								historyLinks 	= {this.state.history_links}
								onSelectItem	= {this.onSelectItem}
								onChecked 		= {this.onChecked}
							/>
							{
								this.state.hideList.length == 0 ?
								<DescriptionLink changeLink = {this.state.changeLink}/>
								:
								<HideMenu onHide={this.onHideList} list = {this.state.hideList}/>
							}
						</div>
					}
			</div>
	}
}

const mapStateToProps = (state) => {
	return {
		storeProfile 	: state.reducerProfile,
	}
}

const mpDispatchToProps = (dispatch) => {
	return{
		onGetInfoUser 		: (token) => dispatch(fetchUserInfo(token)),
		onGetHistoryLinks 	: (token) => dispatch(fetchHistoryLinks(token)),
		onShort 			: (data) => dispatch(fetchShortUserLink(data)),
		getTitle 			: (data) => dispatch(fetchGetTitle(data)),
		onHide 				: (data) => dispatch(fetchHideLink(data))
	}
}

export default connect(mapStateToProps, mpDispatchToProps)(ProfileComponent);