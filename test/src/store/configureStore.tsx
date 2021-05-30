import { createBrowserHistory } from 'history'
import * as localforage from 'localforage'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 1,
  storage: localforage,
  blacklist: [],
}

const history = createBrowserHistory()

const dev = process.env.NODE_ENV === 'development'

let middleware = dev ? applyMiddleware(sagaMiddleware) : applyMiddleware(sagaMiddleware)

if (dev) {
  middleware = composeWithDevTools(middleware)
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

export const store = createStore(persistedReducer, middleware)

export default (): any => {
  const persistor = persistStore(store)
  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run(rootSaga),
  }
}

export { history }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch