import React from 'react';
import PT from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './Tabs.css';

const tabs = [
    {
        name: 'People',
        type: 'people',
    },
    {
        name: 'Starships',
        type: 'starships',
    },
    {
        name: 'Planets',
        type: 'planets',
    },
    {
        name: 'Species',
        type: 'species',
    },
    {
        name: 'Vehicles',
        type: 'vehicles',
    },
];


const Tabs = ({ onClick }) => (
    <div>
        {tabs.map(tab =>
            <button onClick={() => onClick(tab.type)} key={tab.name}>{tab.name}</button>,
        )}
    </div>
);

Tabs.propTypes = {
    onClick: PT.func,
};

export default cssModules(styles)(Tabs);
