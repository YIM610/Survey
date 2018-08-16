/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:26:26 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-16 15:57:35
 */

 import { combineReducers } from 'redux';
 import questionnaires from './questionnaires';
 import dialog from './dialog';
 import calendar from './calendar';

 const rootReducer = combineReducers({
     questionnaires,
     dialog,
     calendar
 });

 export default rootReducer;