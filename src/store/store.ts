import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";

import logger from 'redux-logger';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';

import storage from "redux-persist/lib/storage";

// import { thunk } from "redux-thunk";

import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
};

const persistConfig: ExtendPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production'
  && logger,
  sagaMiddleware
].filter((middleWares): middleWares is Middleware => Boolean(middleWares));

const composeEnhanceer = (
  process.env.NODE_ENV !== 'production'
  && window
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancer = composeEnhanceer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancer);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);


