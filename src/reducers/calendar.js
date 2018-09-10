/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:25:44 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-28 12:01:23
 */

 import { handleActions } from 'redux-actions';
 import * as Types from '../constants/CalendarActionTypes';
 import { LEFT, RIGHT, IN, OUT } from '../constants/CalendarDirectionTypes';

 const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
/* 
    initialState.display取值0,1,2,3,4
    0:不显示
    1:显示这个月最后/早一天
    2:显示这一年最后/早一天
    3.显示这十年最后/早一天
    4.显示这一百年最后/早一天
*/
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