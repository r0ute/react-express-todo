import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TodoApp />, document.getElementById('root'));
registerServiceWorker();
