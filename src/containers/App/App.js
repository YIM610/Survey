/**
 * Created by YIM610 on 2018/6/3
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Main from '../Main/Main'
import '../../styles/reset.scss'

function App({children}) {
    return (
        <div>
            <Header />
            <Main>
                {children}
            </Main>
        </div>
    );
}

App.proptypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default App;