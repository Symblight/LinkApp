import React, { Component } from 'react';
import { ItemLinkComponent } from '../ItemList/ItemList.component';
import './ListItems.component.scss';

const ListShorten = ({
	list
}) =>(
	<div className="list-container">
		{
			list.map((el, i)=>
				<ItemLinkComponent
					key			= { i }
					shortUrl	= { el.short_url }
					longUrl		= { el.long_url }
					clicks		= { el.details.clicks }
					createAt	= { el.createAt }
				/>)
		}
	</div>
)

export default ListShorten;