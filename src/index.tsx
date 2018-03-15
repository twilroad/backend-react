import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReduxRoot from './ReduxRoot';
import './assets/css/main.css';

const rootEl = document.getElementById('root');
ReactDOM.render(<ReduxRoot />, rootEl);

const NextApp = require('./ReduxRoot').default;
ReactDOM.render(
    <NextApp />,
    rootEl
);