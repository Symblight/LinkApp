import ReactDOM from 'react-dom'
import React from 'react'
import {
    AppContainer
	} from 'react-hot-loader';
	
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Component from './components/App'

let store = configureStore();

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<Component />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
)

if(module.hot){
  module.hot.accept(()=>{
   	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component />
			</Provider>
		</AppContainer>,
		document.getElementById('root')
	)
  })
}