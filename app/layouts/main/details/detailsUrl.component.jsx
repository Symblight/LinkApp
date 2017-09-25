 import React, { Component } from 'react';
 import { Grid } from 'react-bootstrap';
 import './detailsUrl.component.scss';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { fetchDetailsUrl } from '../../../actions/getDetailsUrl.actions';
 import moment from 'moment';

class DetailsUrlComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			url:{
					long_url:'',
					short_url:'',
					createAt:'',
					details:{
							clicks: 0
					}
				}
		}
	}

	componentDidMount(){
		this.props.onLoadDetails(this.props.match.params.id)
		.then(()=>{
			this.setState({url: this.props.storeDetails.detailsUrl});
		})
	}

	render(){
		return <div className="container-details">
			<Grid>
				<div className="content-details">
					<div className="element-d longurl-d"><a href={`http://localhost:8080/${this.state.url.long_url}`}>{this.state.url.long_url}</a></div>
					<div className="element-d"><a className="shorturl-d" href={this.state.url.short_url}>sho.ly/{this.state.url.short_url}</a></div>
					<div className="element-d">{moment(this.state.url.createAt).startOf('minute').fromNow()}</div>
					<div className="element-d">Totals clicks: {this.state.url.details.clicks}</div>
				</div>
				<div className="user-details element-d">
					Don't have an account? <Link to="/signin">Join!</Link>
				</div>
			</Grid>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		storeDetails: state.reducerDetailsUrl
	}
}

const mapDispatchToProps = (dispatch)=> {
	return {
		onLoadDetails: (id)=>dispatch(fetchDetailsUrl(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsUrlComponent);