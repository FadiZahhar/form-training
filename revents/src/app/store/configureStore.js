import testReducer from '../../features/sandbox/testReducer'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

export function configureStore() {
    return createStore(testReducer, devToolsEnhancer())
}