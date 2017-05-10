import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as appReducers from 'app/ducks';
import * as api from 'services/api';

let middleware = applyMiddleware(thunk.withExtraArgument(api));

const reducers = combineReducers({ ...appReducers });

if (__DEV__ && __CLIENT__ && typeof window.devToolsExtension === 'function') {
    middleware = compose(middleware, window.devToolsExtension());
}

export default createStore(reducers, middleware);
