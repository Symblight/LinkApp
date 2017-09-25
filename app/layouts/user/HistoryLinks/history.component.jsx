import React from 'react';
import './history.component.scss';
import moment from 'moment';

const HistoryComponent = ({
	historyLinks,
	onSelectItem,
	onChecked
})=>(
	<div className="history-list">
		{
			historyLinks.length!=0?
			historyLinks.map((el)=><ItemLinkComponent 
					key = {el._id}
					shortUrl = {el.short_url}
					longUrl = {el.long_url}
					clicks = {el.details.clicks}
					createAt = {el.createAt}
					onSelectItem = {onSelectItem.bind(null, el)}
					onChecked = { onChecked.bind(null, el) }
			/>
			)
			:
			<div>No links</div>
	}
	</div>
)

const ItemLinkComponent = (
	props
)=>(
	<div className="item-sh" onClick={props.onSelectItem}>
	<div className="checkbox-i"><input type="checkbox" onChange={props.onChecked}></input></div>
		<div className="el-right">
			<div className="long-sh el-sh">
				<a href={props.longUrl}>{props.longUrl}</a></div>
			<div className="el-sh">
				<a className="short-sh" href={`http://localhost:8080/${props.shortUrl}`}>sho.ly/{props.shortUrl}</a>
			</div>
			<div className="el-sh">
				create at {moment(props.createAt).startOf('minute').fromNow()}
			</div>
		</div>
		<div className="el-left">
				{props.clicks}
		</div>
	</div>
)

export default HistoryComponent;