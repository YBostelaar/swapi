import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import Logo from 'vectors/starwars.svg';

import styles from './Header.css';

const Header = () => (
    <header styleName="header">
        <Link to="/"><Logo /></Link>
    </header>
);

Header.propTypes = {
    item: PT.object,
};

export default cssModules(styles)(Header);
