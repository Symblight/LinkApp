import React from 'react';
import './signInForm.component.scss';
import { Link } from 'react-router-dom';

export const SignInForm = ({
	onSubmit,
	onChange,
	email,
	password,
	errors
}) =>(<div className="form-user">			
		<h3>Sign in</h3>
		<button className="fb-btn button-form">
			Facebook
		</button>
		or
		<form className="form-content" onSubmit={onSubmit}>
			<div className="form-group">
				<label>
					Email
				</label>
				{
					errors.email != undefined ?
					<div>
						<input type="text" className='input-form error' value={email} onChange = {onChange} name="email"/>
						<span className="err-msg">{errors.email}</span>
					</div>
					:
					<input type="text" className='input-form' value={email} onChange = {onChange} name="email"/>
				}
			</div>

			<div className="form-group">
				<label>
					Password
				</label>
				{
					errors.password != undefined ?
					<div>
						<input type="password" className='input-form error' value = {password} onChange = {onChange} name="password"/>
						<span className="err-msg">{errors.password}</span>
					</div>
					:
					<input type="password" className='input-form' value={password} onChange = {onChange} name="password"/>
				}
			</div>
			{
				errors.message=="Invalid email or password." ?
				<div className="error-form">Invalid password or username</div>
				:
				null
			}
			<button className ="button-form" type="submit">Sign in</button>
		</form>
		Don’t have an account? <Link to="/signup">Join</Link>
	</div>
)