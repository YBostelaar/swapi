import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './Header.css';

const Header = () => (
    <header>
        <Link to="/">
            Dashboard
        </Link>
    </header>
);

Header.propTypes = {
    item: PT.object,
};

export default cssModules(styles)(Header);
