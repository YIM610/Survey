/**
 * Created by YIM610 on 2018/6/16
 **/

import { createAction } from 'redux-actions';
import * as Types from '../constants/QuestionnaireActionTypes';

export const editText = createAction(Types.EDIT_TEXT, (content, question, option) => ({ content, question, option }));
export const saveText = createAction(Types.SAVE_TEXT, content => content);
export const showType = createAction(Types.SHOW_TYPE, type => type);
export const addQuestion = createAction(Types.ADD_QUESTION, type => type);
export const removeOption = createAction(Types.REMOVE_OPTION, (question, option) => ({question, option}));