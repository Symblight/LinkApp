import React, { Component } from 'react';
import './signUp.component.scss';
import { Redirect } from 'react-router-dom';
import  SignUpFormComponent  from './form/signUpForm.component';
import validator from 'validator';
import validForm from './validator.js';
import { fetchSignUpUser } from '../../actions/signUp.actions';
import { connect } from 'react-redux';
import auth from '../../modules/auth';

class SignUpComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			user:{
				username:'',
				email:'',
				lastname:'',
				firstname:'',
				password:''
			},
			errors:{	
				success:true
			}
		}

		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		//this.onCheckedErrors = this.onCheckedErrors.bind(this);
	}

	onSubmitForm(e){
		e.preventDefault();

		let validFormError = validForm(this.state.user);
		this.setState({errors:validFormError.errors});

 		if(validFormError.success)
			this.props.onSignUpRequest(this.state.user)
				.then(()=>{
					this.setState({errors: this.props.storeUserSign.errors});
					if (this.props.storeUserSign.errors == ''){
						auth.authenticateUser(this.props.storeUserSign.userInfo.token);
						location.reload();
					}
				})
	}

	onChangeValue(e){
		const field = e.target.name;
		const user = this.state.user;
		user[field] = e.target.value;
		this.setState({user});
	}

	render(){
		const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (auth.isUserAuthenticated()){
            return(
                <Redirect to={from}/>
            )
        }
		return <div className="form-container">
			<SignUpFormComponent
				onSubmit = {this.onSubmitForm}
				onChange = { this.onChangeValue }
				user = { this.state.user }
				errors	= { this.state.errors }
			/>
		</div>
	}
}

const mapStateToProps = (state) => {
	return {
		storeUserSign: state.reducerSignUser
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		onSignUpRequest: (user)=> dispatch(fetchSignUpUser(user))
	}
}

export default connect(mapStateToProps, mapDispathToProps)(SignUpComponent);