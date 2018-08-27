/*
 * @Author: YIM610 
 * @Date: 2018-08-17 15:20:28 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-27 16:25:54
 */
import { createAction } from 'redux-actions';
import * as Types from '../constants/CalendarActionTypes';

export const selectDate = createAction(Types.SELECT_DATE, (year, month, date, display) => ({year, month, date, display}));