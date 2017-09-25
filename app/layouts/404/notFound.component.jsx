import React from 'react';
import './notFound.component.scss';

import NotFound from '../../assets/images/notfound.png'

export const NotFoundComponent = ({ location  }) =>(
	<div className="notfound-container">
		<div className="notfound-content">
			<img className="img-notfound" src={NotFound}/>
			<div>Not Found {location.pathname }</div>
		</div>
	</div>
)