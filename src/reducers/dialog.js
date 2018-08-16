/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:25:00 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-16 17:44:04
 */

 import { handleActions } from 'redux-actions';

 const dialog = handleActions({
    ['test1'](state, action) {
        return state;
    }
 }, {});

 export default dialog;