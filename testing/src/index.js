import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from 'reducers'

import App from 'components/App'

ReactDOM.render(
    // createStore take 2 arguments reducers and initial state
    <Provider store={createStore(reducers, {})}>
        <App />,
    </Provider>,

    document.querySelector('#root')
)
