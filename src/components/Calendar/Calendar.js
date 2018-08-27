/*
 * @Author: YIM610 
 * @Date: 2018-08-27 14:49:37 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-27 18:49:48
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Calendar.scss';
import { Mask } from '../';
import { LEFT, RIGHT } from '../../constants/CalendarDirectionTypes';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
    }

    getTable({year, month, date}, display, isNext) {
        const { calendar: { direction, isOutside } } = this.props;
        const table = { caption: '', head: [], body: [] };
        /*if(!isNext || isNext && direction) {
            switch (display) {
                case 1: {

                }
            }
        }*/
        return table;
    }

    handleShow() {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate, saveTime } } = this.props;
        if(!display) {
            saveTime(1970, 1, 1);
            selectDate(year, month, date, 1);
        }
    }

    isForbidden(direction, display) {
        const { calendar: { selected: { year, month, date } },
            begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: {year: endYear, month:endMonth, date: endDate}
        } = this.props;
        const count = []
    }

    renderCaption(direction, display, caption, isNext) {
        if(caption.length) {
            const isForbiddenLeft = this.isForbidden(LEFT, display), isForbiddenRight = this.isForbidden(RIGHT, display);
            return (
                <caption>
                    <div className={classNames({
                        [styles.nav]: true,
                        [styles.navRight]: true
                        //[styles.forbiddenRight]: isForbiddenRight
                    })}
                    //onClick={this.handleNavClick(RIGHT)}
                    />
                    <div
                        className={classNames({
                            [styles.nav]: true,
                        })}
                    ></div>
                </caption>
            )
        }
    }

    render() {
        const { calendar, current, time } = this.props;
        const { selected, next, direction, display } = calendar;
        const currentTime = new Date(current.year, current.month - 1, current.date).getTime();
        const { caption, head, body } = this.getTable(selected, display, false);
        return (
            <span>
                <input type="text"
                    ref="date"
                    value={time >= currentTime ? `${year}-${month}-${date}`: ``}
                    readOnly="readOnly"
                    className={styles.date}
                    onClick={this.handleShow}
                />
                <Mask
                    isVisible={!!display}
                    onLeave={this.handleSave}
                />
                <div
                    className={classNames({
                        [styles.tableWrap]: display
                    })}
                >
                    <table className={styles.table}>
                        {this.renderCaption(direction, display, caption, false)}
                    </table>
                </div>
            </span>
            
        )
        return 'calendar';
    }
}

export default Calendar;