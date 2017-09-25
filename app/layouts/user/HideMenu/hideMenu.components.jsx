import React from 'react'
import './hideMenu.components.scss';

const HideMenuComponent = ({
	onHide,
	list
}) => (
	<div className="hide-menu">
		<div>Change links: {list.length}</div>
		<button className="button-hide" onClick={onHide}>Hide</button>
	</div>
)

export default HideMenuComponent;