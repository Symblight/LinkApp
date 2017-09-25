import React, { Component } from 'react';
import { Grid } from 'react-bootstrap'
import { SignInForm } from './form/signInForm.component';
import { Redirect } from 'react-router-dom';
import validator from 'validator';
import './signIn.component.scss';
import { fetchLoginUser } from '../../actions/login.actions';
import { connect } from 'react-redux';
import auth from '../../modules/auth';

class SignInComponent extends Component{
	constructor(props){
		super(props);
		this.state= {
			user:{
				email:'',
				password: ''
			},
			errorsInput:{
				success:true
			}
		}

		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onCheckedError = this.onCheckedError.bind(this);
	}

	onHandleSubmit(e){
		e.preventDefault();
		this.onCheckedError();
			this.props.onLoginRequest(this.state.user)
			.then(()=>{

				let errors = this.state.errorsInput;
				errors.message =this.props.storeUserSign.errors.message;
				if (errors.message != undefined) errors.success = false;
				this.setState({errorsInput:errors});
				if (this.state.errorsInput.message == undefined){
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

	onCheckedError(){
		let errors={
			success:true
		};

		if (!validator.isEmail(this.state.user.email))
			{
				errors.email = 'Invalid email';
				errors.success=false;
			}

		if (validator.isEmpty(this.state.user.password)){
				errors.password = 'field is not required';
				errors.success=false;
		}
		this.setState({errorsInput: errors});
	}

	render(){
		const { from } = this.props.location.state || { from: { pathname: '/' } }
        if (auth.isUserAuthenticated()){
            return(
                <Redirect to={from}/>
            )
        }
		return <div className="form-container">
			<SignInForm
				onSubmit 	= { this.onHandleSubmit }
				onChange 	= { this.onChangeValue }
				email 		= { this.state.user.email }
				password 	= { this.state.user.password }
				errors		= { this.state.errorsInput }
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
		onLoginRequest: (user)=> dispatch(fetchLoginUser(user))
	}
}

export default connect(mapStateToProps, mapDispathToProps)(SignInComponent);