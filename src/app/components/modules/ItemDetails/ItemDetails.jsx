import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import { getItem } from 'ducks/item';
import _ from 'lodash/fp';

import styles from './ItemDetails.css';

class ItemDetails extends React.Component {
    componentDidMount() {
        this.props.dispatch(getItem(this.props.params.type, this.props.params.id))
    }

    render() {
        return (
            <div styleName="item">
                {this.props.item.loading && (
                    <p>loading...</p>
                )}
                {this.props.item.data && (
                    <p>{this.props.item.data.name}</p>
                )}
            </div>
        );
    }
}

ItemDetails.propTypes = {
    dispatch: PT.func,
};

const withHOCs = _.flow([
    cssModules(styles),
    connect(({ item }) => ({ item })),
]);

export default withHOCs(ItemDetails);
