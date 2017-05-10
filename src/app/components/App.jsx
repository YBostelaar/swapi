import React from 'react';
import PT from 'prop-types';
import { Wrapper } from 'common';
import { Header } from 'modules';

const App = ({ children }) => (
    <main>
        <Header />
        <Wrapper>
            {children}
        </Wrapper>
    </main>
);

App.propTypes = {
    children: PT.shape({}),
};

export default App;
