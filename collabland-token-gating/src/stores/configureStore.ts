// import { createStore, configureStore, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '@/reducers';
import rootSaga from '@/sagas';

// export const history: History = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
function configureStoreProd() {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    sagaMiddleware,
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares),
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

function configureStoreDev() {
  const middlewares = [
    // Add other middleware on this line...
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
    sagaMiddleware,
  ];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares),
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('@/reducers', () => store.replaceReducer(rootReducer));
  }
  sagaMiddleware.run(rootSaga);

  return store;
}

const configuredStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configuredStore;
