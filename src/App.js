import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Spinner from './components/layout/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

//Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

import './public/bootstrap.min.css';
import './public/style.css';

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {

    return !Landing ? (
        <Spinner />
    ) : (
    <Provider store={store}>
        <Router>
            <Fragment>
      
                    <Alert />
                        <Switch>
                                <Route exact path="/" component={Landing} />
                        </Switch>
            </Fragment>

        </Router>
    </Provider> 
)};

export default App;