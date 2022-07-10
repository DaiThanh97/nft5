import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';
import rootSaga from './sagas/root.saga';
import userReducer from './reducers/user.reducer';
import notiReducer from './reducers/noti.reducer';
import loadingReducer from './reducers/loading.reducer';
import movieReducer from './reducers/movie.reducer';

const saga = createSaga();

const rootReducer = combineReducers({
    userReducer,
    notiReducer,
    loadingReducer,
    movieReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(saga))
);

saga.run(rootSaga);

export default store;