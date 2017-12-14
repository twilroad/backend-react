import 'assets/less/main.less';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

/**
 * Application render.
 *
 * @return {Element|Node}
 * @author Seven Du <shiweidu@outlook.com>
 */
const appRender = () => render(
    <AppContainer>
        <Provider store={ store }>
            <App/>
        </Provider>
    </AppContainer>,
    document.querySelector('#root')
);

appRender();

if (module.hot) {
    module.hot.accept('./App', () => appRender());
}
