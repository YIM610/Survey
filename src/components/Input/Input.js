/*
 * @Author: YIM610 
 * @Date: 2018-08-17 14:47:14 
 * @Last Modified by: YIM610
 * @Last Modified time: 2018-08-24 17:17:59
 */
import React, { Component } from 'react';
import { debug } from 'util';

class Input extends Component {
    constructor(props) {
        super(props);
        this.handleEditText = this.handleEditText.bind(this);
        this.handleSaveText = this.handleSaveText.bind(this);
    }

    handleEditText(e) {
        this.props.onEdit(e);
    }

    handleSaveText(e) {
        this.props.onSave(e);
    }

    componentDidMount() {
        debugger;
        const { input } = this.refs;
        input.focus();
        input.select();
    }

    render() {
        const { content, className } = this.props;
        return (
            <input type="text"
                ref="input"
                value={content}
                className={className}
                onChange={this.handleEditText}
                onBlur={this.handleSaveText}
            />
        )
    }
}

export default Input;