import React from 'react';
import './header.component.scss';

//import Identicons from 'identicons-react';

const HeaderComponent = ({
	onSubmit,
	onChange,
	Link,
	UserInfo
})=>(
	<div className="layout-header">
		<div className='layout-form'>
			<form className="form-sh">
				<input className="input-sh" type="text" placeholder="link here" value={Link} onChange={onChange}/>
				<button className="form-button" onClick={onSubmit}>Shorten</button>
			</form>
		</div>
		<ProfileInfo UserInfo = {UserInfo}/>
	</div>
)

const ProfileInfo = (
	props
) => (
	<div className="profile-layout">
			<div className="profile-wrap">
					<div className="item-profile">{props.UserInfo.firstname}</div>
			</div>
	</div>
)

export default HeaderComponent;