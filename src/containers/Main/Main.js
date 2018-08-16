/**
 * Created by YIM610 on 2018/6/3
 **/

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.scss';

function Main({ children }) {
    return(
        <div className={styles.main}>
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Main;