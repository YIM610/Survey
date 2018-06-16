/**
 * Created by YIM610 on 2018/6/16
 **/

import React, { Component,isValidElement } from "react";
import PropTypes from "prop-types";
import styles from "./Table.scss";

const renderThs = columns => columns.map((item, index) => {
    const{ name, dataKey, width, align, th } = item.props;
    const props = { name, dataKey, index };
    let content;
    switch(true) {
        case isValidElement(th) : content = cloneElement(th, props);
        break;
        case typeof th === "function": content = th(props);
        break;
        default: content = name || "";
    }
    return (
        <th
            key={"th-${index}"}
            style={{width, textAlign: align}}
            className={styles["table-th"]}
        >
            {content}
        </th>
    )
});

const renderTds = (columns, data, row, rowIndex)  => columns.map((col, colIndex) => {
    const { datakey, width, align, td } = col.props;
    const props = { data, row, datakey, rowIndex, colIndex };
    let content;
    switch(true) {
        case isValidElement(td) : content = cloneElement(td, props);
        break;
        case typeof td === "function" : content = td(props);
        break;
        default: content = row[dataKey];
    }
    return (
        <td
            key={"td-${rowIndex}-${colIndex}"}
            style={{width, textAlign: align}}
            className={styles["table-td"]}
        >
            {content}
        </td>
    )
});

const renderTrs = (columns, data) => data.map((row, index) => (
    <tr
        key={"tr-${index}"}
        className={styles["table-tbody-tr"]}
    >
        {renderTds(columns, data, row, index)}
    </tr>
));

class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, className, children } = this.props;
        return (
            <table className={className}>
                <tr>
                    {renderThs(children)}
                </tr>
                {renderTrs(children, data)}
            </table>
        )
    }
}

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired,
    className: PropTypes.string.isRequired
};

export default Table;