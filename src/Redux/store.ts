import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import gameReducer from './reducer';
import watcherSagas from './sagas';

const sagaMiddleware =createSagaMiddleware();

const store =createStore(gameReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSagas);
export default store;