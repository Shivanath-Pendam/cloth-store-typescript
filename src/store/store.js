import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";

import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';

import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentSate', store.getState());

    next(action);

    console.log('next state', store.getState());
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

const composeEnhanceer = (
    process.env.NODE_ENV !== 'production'
    && window
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancer = composeEnhanceer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancer);

export const persistor = persistStore(store);


