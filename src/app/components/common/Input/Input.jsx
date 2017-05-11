import React from 'react';
import PT from 'prop-types';
import cssModules from 'react-css-modules';

import styles from './Input.css';

const Input = ({ labelText, onChange, value }) => (
    <div>
        {labelText ? (
            <label htmlFor="input">{labelText}</label>
        ) : null}
        <input id="input" type="text" placeholder="Search" onChange={e => onChange(e.target.value)} value={value} />
    </div>
);

Input.propTypes = {
    labelText: PT.string,
};

export default cssModules(styles)(Input);
