import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import _ from 'lodash/fp';
import { getItemList, getItemType } from 'ducks/dashboard';
import { ItemCard, Tabs, Pagination } from 'common';

import styles from './Dashboard.css';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getItemList());
    }

    onPageChange = (page) => {
        const selectedPage = page.selected + 1;
        this.props.dispatch(getItemList(selectedPage));
    }

    pageCount = () => Math.ceil(this.props.dashboard.count / 10);

    activateTab = (type) => {
        this.props.dispatch(getItemType(type));
    }

    render() {
        const { data, loading } = this.props.dashboard;

        return (
            <div styleName="dashboard">
                <Tabs onClick={this.activateTab} />
                {loading && (
                    <p>loading...</p>
                )}
                {!loading && data && (
                    data.map(item =>
                        <ItemCard key={item.name} item={item} />,
                    )
                )}
                <Pagination
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
                    pageCount={this.pageCount()}
                    activeClassname="active"
                    onPageChange={this.onPageChange}
                />
            </div>
        );
    }
}

Dashboard.propTypes = {
    dispatch: PT.func,
    dashboard: PT.object,
};

const withHOCs = _.flow([
    cssModules(styles),
    connect(({ dashboard }) => ({ dashboard })),
]);

export default withHOCs(Dashboard);
