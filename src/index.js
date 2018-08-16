/**
 * Created by YIM610 on 2018/6/3
 **/


import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { App, Home, Edit, Show, Fill } from './containers';
import { Provider } from 'react-redux';
import genStore from './store/genStore';

const store = genStore();

render(
    <Provider store={store}>
        <HashRouter>
            <App>
                <Route exact component={Home} />
                <Route path='/edit' component={Edit} />
                <Route path='/fill' component={Fill} />
                <Route path='/show' component={Show} />
            </App>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
