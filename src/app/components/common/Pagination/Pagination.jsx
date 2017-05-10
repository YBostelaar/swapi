import React from 'react';
import PT from 'prop-types';
import Paginate from '@labela/paginate';
import '@labela/paginate/dist/style.css';
import cssModules from 'react-css-modules';

import styles from './Pagination.css';

const Pagination = otherProps => (
    <Paginate
        {...otherProps}
        css={styles}
    />
);

Pagination.propTypes = {
    onClick: PT.func,
};

export default cssModules(styles)(Pagination);
