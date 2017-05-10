import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './ItemCard.css';

const ItemCard = ({ item }) => (
    <Link to={`/${item.type}/${item.id}`} styleName="card">
        <ul>
            <li>{item.name}</li>
        </ul>
    </Link>
);

ItemCard.propTypes = {
    item: PT.object,
};

export default cssModules(styles)(ItemCard);
