import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import './FormShorten.component.scss';

export const FormShorten = ({
	onSubmit,
	onChange,
	Link
}) =>(
	<form className="form-sh">
		<input className="input-sh" type="text" placeholder="link here" value={Link} onChange={onChange}/>
		<button className="form-button" onClick={onSubmit}>Shorten</button>
	</form>
)