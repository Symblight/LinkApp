import React from 'react';
import { Col, Grid, Row } from "react-bootstrap";
import "./about.component.scss";

import ReactLogo from '../../../../assets/images/react.svg';
import NodeLogo from '../../../../assets/images/nodejs.svg';
import MongoDbLogo from '../../../../assets/images/MongoDB-Logo.svg';

let logos = [
	{
		source: ReactLogo,
		title: "ReactJs",
		text: "A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES"
	},
	{
		source: NodeLogo,
		title: "NodeJs",
		text: "Back-end"
	},
	{
		source: MongoDbLogo,
		title: "MongoDB",
		text: "What on Earth is MongoDB? Only the coolest collection of dreamers and doers who share a relentless passion for creativity. We eagerly and expertly pursue new opportunities and markets through innovation and disruption. We have a wicked pioneering spirit––always ready to forge new paths and take smart risks. And we do it all very, very well"
	}

]

export const AboutComponent = ({}) =>(
	<div className="container-logo">
	{
		logos.map((el, i)=>
			<ItemService key={i} source={el.source} title={el.title} text={el.text}/>
		)	
	}
	</div>
)

const ItemService = ({ 
	source, 
	title, 
	text
})=>(
	<div className="element-service">
		<div>
			<img className="logo-service" src={source}/>
		</div>
		<div className="service-content">
			<div><h3>{title}</h3></div>
			<div>{text}</div>
		</div>
	</div>
)