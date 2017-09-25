import React,{ Component } from 'react';
import './Content.component.scss';

import { FormShorten } from './FormShorten/FormShorten.component';
import { AboutComponent } from './AboutSite/about.component.jsx';
import ListShorts from './ListShorten/ListItems.component';

import { connect } from 'react-redux';
import { fetchShortenUrl } from '../../../actions/shortUrl.actions.js';
import { fetchListAnon } from '../../../actions/getListAnon.actions.js';
import Auth from '../../../modules/auth';
import { Redirect } from 'react-router-dom';

class ContentComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			link:'',
			listAnonUrl:[]
		};

		this.onShortenLink 	= this.onShortenLink.bind(this);
		this.onChangeLink 	= this.onChangeLink.bind(this);
	}

	componentWillMount(){
		this.props.onGetAnonListShort().then(()=>{
			this.setState({listAnonUrl: this.props.storeShortAnon.listAnonUrl});
		})
	}

	onShortenLink(e){
		e.preventDefault();
		let link = {
			long_url:this.state.link
		};

		this.props.onShortUrl(link)
		.then(()=>{
			this.props.onGetAnonListShort().then(()=>{
				this.setState({listAnonUrl: this.props.storeShortAnon.listAnonUrl});
			})
		})

		this.setState({link: ''});
	}

	onChangeLink(e){
		this.setState({link: e.target.value});
	}

	render(){
		const { from } = this.props.location.state || { from: { pathname: '/profile' } }
        if (Auth.isUserAuthenticated()){
            return(
                <Redirect to={from}/>
            )
        }
		return<div className='content-block'>
			<div className="header-sh">
				<div className="header-txt">Shorten your links</div>
			</div>
			<div className="content-sh">
				<FormShorten 
					onSubmit = { this.onShortenLink }
					onChange = { this.onChangeLink }
					Link = {this.state.link}
				/>
				<ListShorts list={this.state.listAnonUrl}/>
			</div>
			<AboutComponent/>
		</div>
	}
}

const mapStateToProps = (state) =>{
	return {
		storeShortAnon: state.reducerAnonListUrl
	}
}

const mapDispacthToProps = (dispatch) =>{
	return {
		onShortUrl: (url)=> dispatch(fetchShortenUrl(url)),
		onGetAnonListShort: ()=>dispatch(fetchListAnon())
	}
}

export default connect(mapStateToProps, mapDispacthToProps)(ContentComponent);