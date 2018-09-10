/**
 * Created by YIM610 on 2018/6/3
 **/


import React, { Component } from 'react';
import styles from './Edit.scss';
import { Input, Calendar, Dialog } from '../../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { RADIO, CHECKBOX, TEXT } from '../../constants/QuestionTypes';
import classNames from 'classnames';
import * as QuestionnaireActions from '../../actions/questionnaires';
import * as DialogActions from '../../actions/dialog';
import * as CalendarActions from '../../actions/calendar';

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog,
    calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
        bindActionCreators(QuestionnaireActions, dispatch),
        bindActionCreators(DialogActions, dispatch),
        bindActionCreators(CalendarActions, dispatch)
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Edit extends Component {
    constructor(props) {
        super(props);
        this.handleTextEdit = this.handleTextEdit.bind(this);
        this.handleTextSave = this.handleTextSave.bind(this);
        this.handleShowType = this.handleShowType.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.handleToggleRequire = this.handleToggleRequire.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSaveQuestionnaire = this.handleSaveQuestionnaire.bind(this);
        this.handleRealeaseQuestionnaire = this.handleRealeaseQuestionnaire.bind(this);
        this.handleMoveQuestion = this.handleMoveQuestion.bind(this);
        this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this);
        this.handleCopyQuestion = this.handleCopyQuestion.bind(this);
    }

    handleTextEdit(question, option, content) {
        const { editText } = this.props.actions;
        return e => editText(content || e.target.value, question, option);
    }

    handleTextSave(e) {
        const { saveText } = this.props.actions;
        return saveText(e.target.value.trim());
    }

    handleAddQuestion(e) {
        const { showType ,addQuestion } = this.props.actions;
        showType();
        [RADIO, CHECKBOX, TEXT].forEach((ele) => e.target === this.refs[ele] && addQuestion(ele))
    }

    handleRemoveOption(question, option) {
        const { removeOption } = this.props.actions;
        return e => removeOption(question, option);
    }

    handleToggleRequire(question) {
        const { toggleRequire } = this.props.actions;
        return e => toggleRequire(question);
    }

    handleAddOption(question) {
        const { addOption } = this.props.actions;
        return e => addOption(question);
    }

    handleMoveQuestion(index, step) {
        // -1:上移    1:下移
        debugger;
        const { moveQuestion } = this.props.actions;
        return e => moveQuestion(index, step);
    }

    handleRemoveQuestion(index) {
        debugger;
        const { removeQuestion } = this.props.actions;
        return e => removeQuestion(index);
    }

    handleCopyQuestion(index) {
        const { copyQuestion } = this.props.actions;
        return e => copyQuestion(index);
    }

    handleSaveQuestionnaire() {

    }

    handleRealeaseQuestionnaire() {

    }

    renderCalendar() {
        const { questionnaires: { editing: { time } }, calendar, actions } = this.props;
        const now = new Date(),[year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
        return (<Calendar
            calendar={calendar}
            actions={actions}
            begin = {{year, month, date}}
            end={{year: 2270, month: 11, date: 28}}
            current={{year, month, date}}
            time={time}
        />);
    }

    renderTitle() {
        const { questionnaires: { editing } } = this.props;
        if(editing.text.typing && editing.question === -1 && editing.option === -1) {
            return (
                <Input type='text'
                    content={editing.text.content}
                    className={styles.titleInput}
                    onEdit = {this.handleTextEdit(-1, -1)}
                    onSave = {this.handleTextSave}
                />
            )
        }
        const title = editing.title;
        return <div className={styles.title}
                    onClick={this.handleTextEdit(-1, -1, title)}
                >
                    {title}
                </div>
    }

    renderQuestionContent(question) {
        const { questionnaires: { editing } } = this.props;
        if(editing.text.typing && editing.question === question && editing.option === -1) {
            return (
                <Input
                    content={editing.text.content}
                    className={styles.editQuestionContent}
                    onEdit={this.handleTextEdit(editing.question, -1)}
                    onSave={this.handleTextSave}
                />
            );
        }
        else {
            const { type } = editing.questions[question];
            if(type === TEXT) {
                return (
                    <div
                        className={styles.questionContent}>
                        <span>{`${TEXT}题`}</span>
                    </div>
                )
            }
            else {
                const { content } = editing.questions[question];
                return (
                    <div
                        className={styles.questionContent}
                        onClick={this.handleTextEdit(question, -1, content)}
                    >
                        {content}
                    </div>
                )
            }
        }
    }

    renderOption(question, option) {
        const { questionnaires: { editing } } = this.props;
        if (editing.text.typing && editing.question === question && editing.option === option) {
            return (
                <Input content={editing.text.content}
                    className={styles.editOption}
                    onEdit={this.handleTextEdit(editing.question, editing.option)}
                    onSave={this.handleTextSave}
                />
            );
        }
        else {
            const content = editing.questions[question].options[option];
            return (
                <span onClick={this.handleTextEdit(question, option, content)}>
                    {content}
                </span>
            );
        }
    }

    renderQuestions() {
        const { questionnaires: { editing } } = this.props;
        const last = editing.questions.length - 1;
        return (
            editing.questions.map((question, questionIndex) => (
                <div key={questionIndex}
                    className={styles.question}
                >
                    <div className={styles.caption}>
                        <span>{`Q${questionIndex + 1}`}</span>
                        {this.renderQuestionContent(questionIndex)}
                    </div>
                    {question.type !== TEXT ? (
                        <div>
                            {question.options.map((option, optionIndex) => (
                                <div
                                    key={optionIndex}
                                    className={styles.optionWrap}
                                >
                                    <span className={classNames({
                                        [styles.radioOptionIcon]: question.type === RADIO,
                                        [styles.checkboxOptionIcon]: question.type === CHECKBOX
                                    })} />
                                    {this.renderOption(questionIndex, optionIndex)}
                                    <span
                                        className={styles.removeOptionBtn}
                                        onClick={this.handleRemoveOption(questionIndex,optionIndex)}
                                    />
                                </div>
                            ))}
                            <div
                                className={styles.addOptionBtn}
                                onClick={this.handleAddOption(questionIndex)}
                            />
                        </div>
                    ) : (
                        <div>
                            <textarea
                                value={question.content}
                                className={styles.text}
                                onChange={this.handleTextEdit(questionIndex, 0)}
                            />
                            <div className={classNames({
                                    [styles.required]: question.isRequired,
                                    [styles.notRequired]: !question.isRequired
                                })}
                                onClick={this.handleToggleRequire(questionIndex)}
                            >
                                <span>此题是否必填</span>
                            </div>
                        </div>
                    )}
                    <div className={styles.operationWrap}>
                        {questionIndex > 0 && (
                            <div className={styles.operation}
                                onClick={this.handleMoveQuestion(questionIndex, -1)}
                            >
                                <span>上移</span>
                            </div>
                        )}
                        {questionIndex < last && (
                            <div className={styles.operation}
                                onClick={this.handleMoveQuestion(questionIndex, 1)}
                            >
                                <span>下移</span>
                            </div>
                        )}
                        <div className={styles.operation}
                            onClick={this.handleCopyQuestion(questionIndex)}
                        >
                            <span>复用</span>
                        </div>
                        <div className={styles.operation}
                            onClick={this.handleRemoveQuestion(questionIndex)}
                        >
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            ))
        );
    }

    renderTypes() {
        const { questionnaires: { editing: { type } } } = this.props;
        if(type) {
            return (
                <div className={styles.typeWrap}
                    onClick={this.handleAddQuestion}>
                    <div ref={RADIO} className={classNames(styles.type, styles.radio)}>{RADIO}</div>
                    <div ref={CHECKBOX} className={classNames(styles.type, styles.checkbox)}>{CHECKBOX}</div>
                    <div ref={TEXT} className={classNames(styles.type, styles.text)}>{TEXT}</div>
                </div>
            );
        }
    }

    handleShowType() {
        const { showType } = this.props.actions;
        return showType();
    }

    render() {
        return (
            <div>
                {this.renderTitle()}
                <hr className={styles.line}/>
                <div className={styles.questionWrap}>
                    {this.renderQuestions()}
                </div>
                <div className={styles.add}>
                    <ReactCSSTransitionGroup
                        transitionName={styles}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {this.renderTypes()}
                    </ReactCSSTransitionGroup>
                    <div
                        className={styles.addBtn}
                        onClick={this.handleShowType}
                    >
                        <span>添加问题</span>
                    </div>
                </div>
                <hr className={styles.line}/>
                <div className={styles.footer}>
                    <div className={styles.dateWrap}>
                        <span>问卷截止日期</span>
                        {this.renderCalendar()}
                    </div>
                    <input type="button"
                        ref="saveBtn"
                        value="保存问卷"
                        className={styles.btn}
                        onClick={this.handleSaveQuestionnaire}
                    />
                    <input type="button"
                        ref="releaseBtn"
                        value="发布问卷"
                        className={styles.btn}
                        onClick={this.handleRealeaseQuestionnaire}
                    />
                </div>
            </div>
        );
    }
}

export default Edit;