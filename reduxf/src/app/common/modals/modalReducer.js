const OPEN_MODEL = 'OPEN_MODEL';
const CLOSE_MODEL = 'CLOSEMODEL';


export function openModal(payload){
    return{
        type:OPEN_MODEL,
        payload
    }
}

export function closeModal(){
    return{
        type:CLOSE_MODEL,
       
    }
}

const initialState = null;

export default function modalReducer(state = initialState,{type, payload}){
    switch (type){
        case OPEN_MODEL:
            const {modalType, modalProps}= payload;
            return {modalType,modalProps};
        case CLOSE_MODEL:
            return null;
        default:
            return state;    
    }
}