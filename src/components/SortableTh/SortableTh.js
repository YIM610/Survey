/**
 * Created by YIM610 on 2018/6/16
 **/

import React, { Component } from "react";
import styles from "./SortableTh.scss";

class SortableTh extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { dataKey, onSort } = this.props;
        this.onSort = onSort(dataKey);
    }

    handleClick() {
        this.onSort();
    }

    render() {
        const { name } = this.props;
        return (
            <div
                className={styles.content}
                onClick={this.handleClick}
            >
                <span>{name}</span>
            </div>
        );
    }
}

export default SortableTh;