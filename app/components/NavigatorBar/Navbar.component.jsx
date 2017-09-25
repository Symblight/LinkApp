import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../../modules/auth';
import RouterNavItem from './NavBarItem/NavBarItem.component';
import './Navbar.component.scss';

class NavBarComponent extends Component{
	constructor(props){
		super(props);

	}

	render(){
		return<Navbar inverse collapseOnSelect>

			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">Short Link</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
				{
					Auth.isUserAuthenticated()?
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <RouterNavItem eventKey={1} to='/profile'>Account</RouterNavItem>
				        <RouterNavItem eventKey={2} to='/Logout'>Sign Out</RouterNavItem>
				      </Nav>
				    </Navbar.Collapse>
				    :
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <RouterNavItem eventKey={1} to='/signin'>Sign In</RouterNavItem>
				        <RouterNavItem eventKey={2} to='/signup'>Sign Up</RouterNavItem>
				      </Nav>
				    </Navbar.Collapse>
				}
			  </Navbar>
			
	}
}

export default NavBarComponent;