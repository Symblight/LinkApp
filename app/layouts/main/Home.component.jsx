import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import './Home.component.scss';

import { HeaderComponent } from './header/Header.component';
import { NotFoundComponent } from '../404/notFound.component';
import ContentComponent from './Content/Content.component';
import DetailsUrlComponent from './details/detailsUrl.component';
import SignIn from '../signin/signIn.component';
import SignUp from '../signup/signUp.component';
import Profile from '../user/profile.component';
import Auth from '../../modules/auth';

class HomeComponent extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return<section>
			<Switch>
				<Route exact path='/' component = {ContentComponent} />
				<Route path = '/details/:id' component = {DetailsUrlComponent} />
				<Route path = '/signin' component = { SignIn } />
				<Route path = '/signup' component = { SignUp } />
				<Route path = '/Logout' component = { Logout } />
				<PrivateRoute path = '/profile' component = { Profile } /> {/*/:login/shol/:link*/}
				<Route component = { NotFoundComponent } />
			</Switch>
		</section>
	}
}

const PrivateRoute = ({component, rest}) => (
  <Route  {...rest} render={props=>(
      Auth.isUserAuthenticated()?(
      React.createElement(component, props)
      ): (
          <Redirect to={'/signin'}/>
      )
    )}/>
)

class Logout extends Component{
    render(){
        Auth.deauthenticateUser()
        window.location.reload()
        return<Redirect to={'/'}/>
    }
}

export default HomeComponent;