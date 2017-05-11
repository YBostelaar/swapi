import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';
import _ from 'lodash/fp';
import Spinner from '@labela/spinner';
import '@labela/spinner/dist/style.css';
import { getItemList, getItemType, getSearchQuery } from 'ducks/dashboard';
import { ItemCard, Tabs, Pagination, Input, Wrapper } from 'common';

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

    handleSearchDebounced = _.debounce(300, () => this.props.dispatch(getItemList()));

    handleSearch = (searchQuery) => {
        this.props.dispatch(getSearchQuery(searchQuery));
        this.handleSearchDebounced();
    }

    render() {
        const { data, loading } = this.props.dashboard;

        return (
            <div styleName="dashboard">
                <Tabs onClick={this.activateTab} active={this.props.dashboard.item_type} />
                <Wrapper>
                    <div styleName="search">
                        <Input labelText="Search:" onChange={this.handleSearch} value={this.props.dashboard.search_query} />
                    </div>
                    <div styleName="list">
                        {loading && (
                            <div styleName="loader">
                                <Spinner css={styles} />
                            </div>
                        )}
                        {!loading && data && (
                            data.map(item =>
                                <ItemCard key={item.name} item={item} />,
                            )
                        )}
                    </div>
                    <Pagination
                        previousLabel="&laquo;"
                        nextLabel="&raquo;"
                        pageCount={this.pageCount()}
                        activeClassname="active"
                        onPageChange={this.onPageChange}
                    />
                </Wrapper>
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
