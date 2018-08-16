/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:25:44 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-16 17:44:14
 */

 import { handleActions } from 'redux-actions';

 const calendar = handleActions({
    ['test3'](state, action) {
        return state;
    }
 }, {});

 export default calendar;