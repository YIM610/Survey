/*
 * @Author: YIM610 
 * @Date: 2018-08-27 15:58:01 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-28 12:09:19
 */
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Mask.scss';

class Mask extends Component {
    constructor(props) {
        super(props);

        this.handleLeave = this.handleLeave.bind(this);
    }

    handleLeave(e) {
        this.props.onLeave(e);
    }

    renderMask() {
        if(this.props.isVisible) {
            return (
                <div
                    className={styles.mask}
                    onClick={this.handleLeave}
                />
            )
        }
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName={styles}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {this.renderMask()}
            </ReactCSSTransitionGroup>
        )
    }
}

export default Mask;