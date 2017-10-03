import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

ReactDOM.render((
    <Provider store={configureStore()}>
        <TodoApp />
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
