/**
 * Created by YIM610 on 2018/6/3
 **/

import React from "react";
import PropTypes from "prop-types";

function Main({ children }) {
    return(
        <div>
            {children}
        </div>
    );
}

Main.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Main;