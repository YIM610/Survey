/*
 * @Author: YIM610 
 * @Date: 2018-08-16 11:23:41 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-27 16:29:24
 */

import { handleActions } from 'redux-actions';
import * as Types from '../constants/QuestionnaireActionTypes';
import { RADIO, CHECKBOX, TEXT } from '../constants/QuestionTypes';

const list = localStorage.list ? JSON.parse(localStorage.list) : [];
const initialEditing = {
     questionnaire: -1,
     title: '这里是标题',
     time: 0,
     order: 0,
     questions: [],
     option: -1,
     type: false,
     question: -1,
     text: { typing: false, content: '' }
 };

 const initialState = {
     list,
     editing: initialEditing
 };

 const questionnaires = handleActions({
    [Types.EDIT_TEXT](state, action) {
        const { editing } = state;
        const { content, question, option } = action.payload;
        if(question !== -1 && option !== -1 && editing.questions[question].type === TEXT) {
            editing.questions[question].content = content;
            return Object.assign({}, state, { editing });
        }
        return Object.assign({}, state, { editing: { ...editing, question, option, text: { typing: true, content } } });
    },
    [Types.SAVE_TEXT](state, action) {
        debugger;
        const { editing } = state;
        const { questionnaire, question, option } = editing;
        const content = action.payload;
        switch(true) {
            case question === -1 : editing.title = content; break;
            case option === -1: editing.questions[question].content = content;
            default: editing.questions[question].options[option] = content;
        }
        return Object.assign({}, state, { editing: { ...editing, question: -1, option: -1, text: {typing: false, content: '' } } });
    },
    [Types.SHOW_TYPE](state, action) {
        const { editing } = state;
        const type = !editing.type;
        return Object.assign({}, state, { editing: { ...editing, type }});
    },
    [Types.ADD_QUESTION](state, action) {
        const { editing } = state;
        const type = action.payload;
        let question;
        switch(type) {
            case RADIO: question = { type, content: '单选题', options: ['选项1', '选项2'] }; break;
            case CHECKBOX: question = { type, content: '多选题', options: ['选项1', '选项2', '选项3', '选项4'] }; break;
            case TEXT: question = { type, content: '', isRequired: false }; break;
            default: question = {};
        }
        editing.questions.push(question);
        return Object.assign({}, state, { editing });
    },
    [Types.REMOVE_OPTION](state, action) {
        debugger;
        const { editing } = state;
        const { question, option } = action.payload;
        let questions = editing.questions;
        questions[question].options.splice(option, 1);
        return Object.assign({}, state, { editing: { ...editing ,question: -1, option: -1, questions}});
    },
    [Types.TOGGLE_REQUIRE](state, action) {
        const question = action.payload;
        let { editing } = state;
        editing.questions[question].isRequired = !editing.questions[question].isRequired;
        return Object.assign({}, state, { editing });
    },
    [Types.ADD_OPTION](state, action) {
        const question = action.payload;
        const { editing } = state;
        editing.questions[question].options.push(`选项${editing.questions[question].options.length + 1}`)
        return Object.assign({}, state, { editing });
    },
    [Types.SAVE_TIME](state, action) {
        const { editing } = state;
        const { year, month, date } = action.payload;
        editing.time = new Date(year, month - 1, date).getTime();
        return Object.assign({}, state, { editing });
    }
 }, initialState);

 export default questionnaires;