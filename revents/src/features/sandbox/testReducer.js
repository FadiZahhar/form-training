export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

const initialState = {
    data: 42
}

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            };
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            };
        default:
            return state;


    }
}