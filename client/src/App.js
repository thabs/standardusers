import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Loadable from 'react-loadable';
import './App.scss';

// Containers
import reducers from './reducers';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

class App extends Component {

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
