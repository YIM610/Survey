/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:25:44 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-27 17:54:53
 */

 import { handleActions } from 'redux-actions';
 import * as Types from '../constants/CalendarActionTypes';
 import { LEFT, RIGHT, IN, OUT } from '../constants/CalendarDirectionTypes';

 const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
 const initialState = {
     selected: { year, month, date },
     next: { year, month, date },
     direction: '',
     display: 0,
     isOutside: false
 }

 const calendar = handleActions({
    [Types.SELECT_DATE](state, action) {
        const {year, month, date, display} = action.payload;
        return Object.assign({}, state, { selected: { year, month, date }, display });
    }
 }, initialState);

 export default calendar;