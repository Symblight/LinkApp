import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import githublogo from '../../assets/images/github-icon.svg'

import './Footer.component.scss';

class FooterComponent extends Component{
	render(){
		return<footer className='footer-block'>
			<div className="footer-container">
				<div className="footer-content">
					<div className="email-f">contact at symblight@gmail.com</div>
					<a href="https://github.com/Symblight"><img src={githublogo} className="service-logo"/></a>
				</div>
			</div>
		</footer>
	}
}

export default FooterComponent;