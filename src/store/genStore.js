/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:16:22 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-20 10:01:35
 */

import { createStore } from 'redux';
import rootReducer from '../reducers';

const genStore = (initialState) => {
    const store = createStore(rootReducer, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);
    return store;
}

export default genStore;