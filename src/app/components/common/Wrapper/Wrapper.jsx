import React from 'react';
import PT from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './Wrapper.css';

const Wrapper = ({ children }) => (
    <div styleName="wrapper">
        {children}
    </div>
);

Wrapper.propTypes = {
    children: PT.object,
};

export default cssModules(styles)(Wrapper);
