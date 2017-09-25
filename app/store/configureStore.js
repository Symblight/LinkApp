import thunk from 'redux-thunk';
import reducers from '../reducers/index.js';
import { createStore, applyMiddleware } from 'redux'

export default function configurationStore(initialState){
    let store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    )
    return store
};
