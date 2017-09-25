import React from 'react';
import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ItemList.component.scss';

export const ItemLinkComponent = ({
	shortUrl,
	longUrl,
	clicks,
	createAt
})=>(
	<div className="item-sh">
		<div className="el-right">
			<div className="long-sh el-sh">
				<a href={longUrl}>{longUrl}</a></div>
			<div className="el-sh">
				<a className="short-sh" href={shortUrl}>sho.ly/{shortUrl}</a>
			</div>
			<div className="el-sh">
				create at {moment(createAt).startOf('minute').fromNow()}
			</div>
		</div>
		<div className="el-left">
			<Link to={`/details/${shortUrl}`}>
				{clicks}
			</Link>
		</div>
	</div>
)