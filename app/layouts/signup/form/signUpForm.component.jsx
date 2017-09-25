import React from 'react';
import './signUpForm.component.scss';
import { Row, Col } from 'react-bootstrap';

const SignUpFormComponent =({
	onSubmit,
	onChange,
	user,
	errors,
})=>(
	<div className="form-user">
		<h3>Sign up</h3>
		<form className="form-content" onSubmit={onSubmit}>
				<FirstNameAndLastname
					onChange={onChange}
					firstname= {user.firstname}
					lastname = {user.lastname}
					errors = {errors}
				/>
				<UsernameField
					onChange={onChange}
					username={user.username}
					errors ={errors}
				/>
				<EmailField
					onChange={onChange}
					email={user.email}
					errors ={errors}
				/>
				<PasswordField 
					onChange={onChange}
					password={user.password}
					errors={errors}
				/>
			<button className ="button-form" type="submit">Sign up</button>
		</form>
	</div>
)

const FirstNameAndLastname = (
	props
) =><div className="form-group">
	<Row>
		<Col md={6}>
			<label>
				First name
			</label>
			{
				props.errors.firstname!=undefined ?
				<div>
					<input className="input-form error" type="text" name="firstname" onChange={props.onChange} value={props.firstname}/>
					<span className="err-msg">{props.errors.firstname}</span>
				</div>
				:
				<input className="input-form" type="text" name="firstname" onChange={props.onChange} value={props.firstname}/>
			}
		</Col>
		<Col md={6}>
			<label>
				Last name
			</label>
			{
				props.errors.lastname!=undefined ?
				<div>
					<input className="input-form error" type="text" name="lastname" onChange={props.onChange} value={props.lastname}/>
					<span className="err-msg">{props.errors.lastname}</span>
				</div>
				:
				<input className="input-form" type="text" name="lastname" onChange={props.onChange} value={props.lastname}/>
			}
		</Col>
	</Row>
</div>

const UsernameField = (props) =>(
	<div className="form-group">
			<label>
				Username
			</label>
		{
			props.errors.username!=undefined ?
			<div>
				<input className="input-form error" type="text" name="username" onChange={props.onChange} value={props.username}/>
				<span className="err-msg">{props.errors.username}</span>
			</div>
			:
			<input className="input-form" type="text" name="username" onChange={props.onChange} value={props.username}/>
		}
	</div>
)

const EmailField = (props) =>(
	<div className="form-group">
		<label>
			Email
		</label>
		{
			props.errors.email!=undefined ?
			(	
				<div>
					<input className="input-form error" type="text" name="email" onChange={props.onChange} value={props.email}/>
					<span className="err-msg">{props.errors.email}</span>
				</div>
			)
			:
			<input className="input-form" type="text" name="email" onChange={props.onChange} value={props.email}/>
		}
	</div>
)

const PasswordField = (props) =>(
	<div className="form-group">
			<label>
				Password
			</label>
			{
				props.errors.password!=undefined ?
				<div>
					<input className="input-form error" type="password" name="password" onChange={props.onChange} value={props.password}/>
					<span className="err-msg">{props.errors.password}</span>
				</div>
				:
				<input className="input-form" type="password" name="password" onChange={props.onChange} value={props.password}/>
			}
	</div>
)
export default SignUpFormComponent;