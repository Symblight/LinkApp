import React from 'react';
import './description.component.scss';

import moment from 'moment';

const DescriptionComponent = ({
	changeLink
})=>(
	<div className="description-l">
		{
			changeLink.long_url!=''?
			<div>
				<div className="el-sh">
					create at {moment(changeLink.createAt).startOf('minute').fromNow()}
				</div>
				<div><h2>{changeLink.title}</h2></div>
				<div><a href={changeLink.long_url}>{changeLink.long_url}</a></div>
				<div><a className="short-sh" href={`http://localhost:8080/${changeLink.short_url}`}>sho.ly/{changeLink.short_url}</a></div>
				<div>{changeLink.details.clicks}</div>
			</div> 
			:
			<div className="not-change"><h1>Not change link</h1></div>
		}
	</div>
)

export default DescriptionComponent;