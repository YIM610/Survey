/**
 * Created by YIM610 on 2018/6/3
 **/

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import propTypes from "prop-types";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Table, Column, SortableTh, Dialog } from "../../components";
import { UNRELEASED, RELEASED, CLOSED } from "../../constants/QuestionnaireStatusTypes";
import styles from "./Home.scss";
import * as QuestionnaireActions from "../../actions/questionnaires";

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
            bindActionCreators(QuestionnaireActions, dispatch),
            bindActionCreators(DialogActions, dispatch)
        )
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleQuestionnaireSort = this.handleQuestionnaireSort.bind(this);
    }

    handleQuestionnaireSort(dataKey) {
        const { sort } = this.props.actions;
        return event => sort(dataKey);
    }

    render() {
        return list.length ? (
            <div>
                <Table
                    ref="table"
                    data={list}
                    className={styles.table}
                >
                    <Column
                        name="标题"
                        dataKey="title"
                        width="30%"
                        align="center"
                    />
                    <Column
                        name="时间"
                        dataKey="time"
                        width="20%"
                        align="center"
                        th={(
                            <SortableTh onSort={this.handleSort}/>
                        )}
                        td={
                            ({ data, row, dataKey, rowIndex, colIndex }) => {
                                const time = new Date(row[dataKey]);
                                const [year, month, data ] = [ time.getFullYear(), time.getMonth() + 1, time.getDate()];
                                return year === 1970 ? "-" : "${year}-${month}-${date}";
                            }
                        }
                    />
                    <Column
                        name="状态"
                        dataKey="status"
                        width="10%"
                        align="center"
                        td={
                            ({ data, row, dataKey,rowIndex, colIndex }) => (
                                <div
                                    className={classNames({
                                        [styles.released] : row[dataKey] === RELEASED,
                                        [styles.closed]: row[dataKey] === CLOSED
                                    })}
                                >
                                    {row[dataKey]}
                                </div>
                            )
                        }
                    />
                    <Column
                        name="操作"
                        dataKey=""
                        width="40%"
                        align="center"
                        th={
                            ({ name, dataKey, colIndex }) => (
                                <div>
                                    <span
                                        className={styles["btn-hint"]}
                                    >
                                        {name}
                                    </span>
                                    <Link to="/edit"
                                        className={styles.link}
                                    >
                                        <input
                                            type="button"
                                            value="新建问卷"
                                            className={styles["add-btn"]}
                                            onClick={this.handleAddQuestionnaire}
                                        />
                                    </Link>
                                </div>
                            )
                        }
                        td={
                            ({ data, row, dataKey, rowIndex, colIndex }) => (
                                row.status === RELEASED ? (
                                    <div>
                                        <Link to="/fill"
                                            className={styles.link}
                                        >
                                            <input
                                                type="button"
                                                value="填写问卷"
                                                className={styles.btn}
                                                onClick={this.handleFillQuestionnaire(rowIndex)}
                                            />
                                        </Link>
                                        <Link
                                            to="/check"
                                            className={styles.link}
                                        >
                                            <input
                                                type="button"
                                                value="查看数据"
                                                className={styles.btn}
                                                onClick={this.handleCheckData(rowIndex)}
                                            />
                                        </Link>
                                    </div>
                                ) :(
                                    <div>
                                        { row.status === UNRELEASED ? (
                                            <Link
                                                to="/edit"
                                                className={styles.link}
                                            >
                                                <input
                                                    type="button"
                                                    value="编辑问卷"
                                                    className={styles.btn}
                                                    onClick={this.handleEditQuestionnaire(rowIndex)}
                                                />
                                            </Link>
                                        ) : (
                                            <Link
                                                to="/check"
                                                className={styles.link}
                                            >
                                                <input
                                                    type="button"
                                                    value="查看数据"
                                                    className={styles.btn}
                                                    onClick={this.handleCheckData(rowIndex)}
                                                />
                                            </Link>
                                        ) }
                                        <input
                                            ref={"remove-btn-${rowIndex}"}
                                            type="button"
                                            value="删除问卷"
                                            className={styles.btn}
                                            onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                        />
                                        <Dialog
                                            dialog={dialog}
                                            self={this.table || {}}
                                            id={"remove-btn-${rowIndex}"}
                                            onLeave={this.handleRemoveQuestionnaire(rowIndex)}
                                            title={"提示"}
                                        >
                                            <div
                                                className={styles.dialog}
                                            >
                                                <div>
                                                    <p>{"确认删除此问卷?"}</p>
                                                </div>
                                                <div
                                                    className={styles["btn-wrap"]}
                                                >
                                                    <Link
                                                        to="/"
                                                        className={styles.link}
                                                    >
                                                        <input
                                                            type="button"
                                                            ref="confirm-btn"
                                                            value="确定"
                                                            className={styles.btn}
                                                            onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                        />
                                                    </Link>
                                                    <input
                                                        type="button"
                                                        value="取消"
                                                        className={styles.btn}
                                                        onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                    />
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>
                                )
                            )
                        }
                    />
                </Table>
            </div>
        ) : (
            <div className={styles.wrap}>
                <Link to="/edit" className={styles.link}>
                    <div className={styles["add-btn"]}
                        onClick={this.handleAddQuestionnaire}
                    >
                        <span>新建问卷</span>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Home;