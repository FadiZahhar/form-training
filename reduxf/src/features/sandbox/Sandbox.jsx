import React from 'react';
import { Button } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import  {DECREMENT_COUNTER, INCREMENT_COUNTER} from './testReducer.js';

export default function Sandbox(){
    const dispatch = useDispatch();
    const data = useSelector(state => state.data)

    return (
        <>
            <h1>Testing 123</h1>
            <h3>The data is: {data} </h3>
            <Button onClick={()=> dispatch({type:INCREMENT_COUNTER})} content='Increment' color ='green'></Button>
            <Button onClick={()=> dispatch({type: DECREMENT_COUNTER})} content='Decrement' color ='red'></Button>
        </>
    )
}