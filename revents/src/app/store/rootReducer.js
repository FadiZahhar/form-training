import eventReducer from '../../features/events/eventReducer'
import testReducer from '../../features/sandbox/testReducer'
import { combineReducers } from 'redux'
import modalReducer from '../common/modals/modalReducer'

const rootReducer = combineReducers({
    test: testReducer,
    event: eventReducer,
    modals: modalReducer
})

export default rootReducer