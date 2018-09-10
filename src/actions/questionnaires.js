/**
 * Created by YIM610 on 2018/6/16
 **/

import { createAction } from 'redux-actions';
import * as Types from '../constants/QuestionnaireActionTypes';
import { create } from 'domain';

export const editText = createAction(Types.EDIT_TEXT, (content, question, option) => ({ content, question, option }));
export const saveText = createAction(Types.SAVE_TEXT, content => content);
export const showType = createAction(Types.SHOW_TYPE, type => type);
export const addQuestion = createAction(Types.ADD_QUESTION, type => type);
export const removeOption = createAction(Types.REMOVE_OPTION, (question, option) => ({question, option}));
export const toggleRequire = createAction(Types.TOGGLE_REQUIRE, question => question);
export const addOption = createAction(Types.ADD_OPTION, question => question);
export const saveTime = createAction(Types.SAVE_TIME, (year, month, date) => ({year, month, date}));
export const removeQuestion = createAction(Types.REMOVE_QUESTION, index => index);
export const moveQuestion = createAction(Types.MOVE_QUESTION, (index, step) => ({index, step}));
export const copyQuestion = createAction(Types.COPY_QUESTION, index => index);
