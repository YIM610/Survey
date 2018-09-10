/*
 * @Author: YIM610 
 * @Date: 2018-08-27 14:49:37 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-30 17:57:13
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
        this.handleSave = this.handleSave.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
    }

    getTable({year, month, date}, display, isNext) {
        debugger;
        const { calendar: { direction, isOutside } } = this.props;
        const table = { caption: '', head: [], body: [] };
        //不是箭头跳转，或者是箭头跳转，这个时候有direction
        if(!isNext || isNext && direction) {
            switch (display) {
                case 1: {
                    const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    //这个月的第一天是星期几
                    const offset = 7 - (date - new Date(year, month - 1, date).getDay() + 6) % 7;
                    table.caption = `${year}年${month}月`;
                    table.head = ['日', '一', '二', '三', '四', '五', '六'];
                    table.body = [[], [], [], [], [], []];
                    //i控制行数，如果31天的月份1号在周五，那需要六行，所以同一设置日历为六行
                    for( let i = 0, k = count[(month + 10) % 12 + 1] - offset + 1; i < 6; i++) {
                        //j控制星期，i为0即第一行时,到offset的星期处为1号
                        for(let j = 0; j < 7; j++, k = !i && j ^ offset || i && k ^ count[month] ? k + 1 : 1) {
                            table.body[i][j] = k;
                        }
                    }
                    break;
                }
            }
        }
        return table;
    }

    handleShow() {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate, saveTime } } = this.props;
        if(!display) {
            //弹出日历的时候把时间设置为默认初始值
            saveTime(1970, 1, 1);
            selectDate(year, month, date, 1);
        }
    }

    handleSave() {
        const { calendar: { selected: { year, month, date }, display}, actions: { selectDate, saveTime } } = this.props;
        selectDate(year, month, date, 0);
        saveTime(year, month, date);
    }

    handleDateClick(i, j, isOutsideThisRange) {
        const { calendar: { selected: { year, month, date }, display }, actions: { selectDate } } = this.props;
        return e => {
            switch (display) {
                case 1: {
                    const date = Number(e.target.innerHTML);
                    switch (true) {
                        default: {
                            selectDate(year, month, date, display);
                            setTimeout(() => this.handleSave(), 0);
                        }
                    }
                }
            }
        }
    }

    isForbidden(direction, display) {
        const { calendar: { selected: { year, month, date } },
            begin: { year: beginYear, month: beginMonth, date: beginDate },
            end: {year: endYear, month:endMonth, date: endDate}
        } = this.props;
        //每月天数，第一个为空，将月份和下标对应起来
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const begin = new Date(beginYear, beginMonth - 1, beginDate), end = new Date(endYear, endYear - 1, endDate);
        switch(direction) {
            case LEFT: {
                switch (display) {
                    case 1: return new Date(year, month - 1, count[month]) >= end;
                    case 2: return new Date(year, 12, 31) >= end;
                    case 3: return new Date(year - year % 10 + 9, 12, 31) >= end;
                    case 4: return new Date(year - year % 100 + 99, 12, 31) >= end;
                }
            }
            case RIGHT: {
                switch (display) {
                    case 1: return new Date(year, month - 1, 1) <= begin;
                    case 2: return new Date(year, 1, 1) <= begin;
                    case 3: return new Date(year - year % 10, 1, 1) <= begin;
                    case 4: return new Date(year - year % 100, 1, 1) <= begin;
                }
            }
        }
    }

    renderCaption(direction, display, caption, isNext) {
        if(caption.length) {
            const isForbiddenLeft = this.isForbidden(LEFT, display), isForbiddenRight = this.isForbidden(RIGHT, display);
            return (
                <caption>
                    <div className={classNames({
                        [styles.nav]: true,
                        [styles.navRight]: true,
                        [styles.forbiddenRight]: isForbiddenRight})}
                        //onClick={this.handleNavClick(RIGHT)}
                    />
                    <div
                        className={classNames({
                            [styles.caption]: true,
                        })}
                        //onClick={this.handleCaptionClick}
                    >
                        {caption}
                    </div>
                    <div className={classNames({
                        [styles.nav]: true,
                        [styles.navLeft]: true,
                        [styles.forbiddenLeft]: isForbiddenLeft})}
                        //onClick={this.handleNavClick(LEFT)}
                    />
                </caption>
            )
        }
    }

    getDateClassName(day, direction, display, i, j, isNext, isNotThisMonth, isOutsideThisRange) {
        return classNames({
            [styles.data]: true
        })
    }

    renderCalendar(direction, display, head, body, isNext, isNotThisMonth, isOutsideThisRange) {
        debugger;
        if(body.length) {
            return (
                <tbody>
                    {this.renderCalendarHead(head)}
                    {body.map((row, i) => (
                        <tr key={i}>
                            {row.map((day, j) => (
                                <td key={j}
                                    className={this.getDateClassName(day, direction, display, i, j, isNext, isNotThisMonth, isOutsideThisRange)}
                                    onClick={this.handleDateClick(i, j, isOutsideThisRange)}
                                >
                                    {day}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            );
        }
    }

    renderCalendarHead(head) {
        if(head.length) {
            return (
                <tr>
                    {head.map((day, index) => (
                        <th
                            key={index}
                            className={styles.head}
                        >
                            {day}
                        </th>
                    ))}
                </tr>
            );
        }
    }


    isNotThisMonth() {
        return false;
    }

    isOutsideThisRange() {
        return false;
    }

    render() {
        const { calendar, current, time } = this.props;
        const { selected, next, direction, display } = calendar;
        const currentTime = new Date(current.year, current.month - 1, current.date).getTime();
        const day = new Date(time);
        const [year, month, date] = [day.getFullYear(), day.getMonth() + 1, day.getDate()];
        const { caption, head, body } = this.getTable(selected, display, false);
        const { caption: nextCaption, head: nextHead, body: nextBody} = this.getTable(next, display, true);
        const isNotThisMonth = this.isNotThisMonth(), isOutsideThisRange = this.isOutsideThisRange();
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
                        {this.renderCaption(direction, display, nextCaption, true)}
                        {this.renderCalendar(direction, dispatchEvent, head, body, false, isNotThisMonth, isOutsideThisRange)}
                    </table>
                </div>
            </span>
            
        )
        return 'calendar';
    }
}

export default Calendar;