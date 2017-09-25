import React, { Component } from 'react'
import { 
	HashRouter
} from 'react-router-dom'
import './App.scss'

import NavBarComponent from './NavigatorBar/Navbar.component';
import FooterComponent from './Footer/Footer.component';
import HomeComponent from '../layouts/main/Home.component';

export default class App extends Component {
    render(){
        return <HashRouter>
            <main>
                <NavBarComponent/>
                <HomeComponent/>
                <FooterComponent/>
            </main>
        </HashRouter>
    }
}