/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:16:22 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-16 16:00:34
 */

import { createStore } from 'redux';
import rootReducer from '../reducers';

const genStore = (initialState) => {
    const store = createStore(rootReducer, initialState);
    return store;
}

export default genStore;