/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:23:41 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-16 17:43:37
 */

 import { handleActions } from 'redux-actions';
 import * as Types from '../constants/QuestionnaireActionTypes';

/* const initialEditing = {
     questionnaire: -1,
     title: '这里是标题',
     time: 0,
     order: 0,
     questions: [],
     option: -1,
     text: { typing: false, content: ''},
     data: []
 };

 const initialState = {
     list,
     editing: cloneObject(initialEditing)
 };*/

 const initialState = {
     test: 'questionnaires'
 };

 const questionnaires = handleActions({
    ['test'](state, action) {
        return state;
    }
 }, {});

 export default questionnaires;