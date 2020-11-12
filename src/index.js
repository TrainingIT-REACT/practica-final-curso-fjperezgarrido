import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
// Styles

import './index.css';
// // Redux
import { Provider } from 'react-redux';
import store from './store';

// Importamos los componentes
import BaseContainer from './containers/BaseContainer';
import AlbumContainer from './containers/AlbumContainer';
import ArtistContainer from './containers/ArtistContainer';
import SongsContainer from './containers/SongsContainer';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
        <Switch>
            <Route path="/" exact={true} component={ BaseContainer }/>
            <Route path="/albums-list" component={ AlbumContainer }/>
            {/*<Route path="/artists" component={ ArtistContainer }/>*/}
            {/*<Route path="/songs" component={ SongsContainer }/>*/}
        </Switch>
    </Router>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
