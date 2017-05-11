import React from 'react';
import PT from 'prop-types';
import { Header } from 'modules';

const App = ({ children }) => (
    <main>
        <Header />
        {children}
    </main>
);

App.propTypes = {
    children: PT.shape({}),
};

export default App;
