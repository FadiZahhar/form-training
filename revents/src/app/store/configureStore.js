import testReducer from '../../features/sandbox/testReducer'
import { createStore } from 'redux'

export function configureStore() {
    return createStore(testReducer)
}