import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Main from './components/Main';
import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

let sagaTask = sagaMiddleware.run(sagas);

console.log('rendering!');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Main);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render(Main);
  });

  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default;
    return store.replaceReducer(reducers);
  });

  module.hot.accept('./sagas', () => {
    const newSagas = require('./sagas').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(newSagas);
    });
  });
}

