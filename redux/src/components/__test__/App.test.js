import React from "react";
import {shallow} from 'enzyme';
import App from '../App';
import ComentBox from '../commentbox';
it ('shows a comment box',()=>{
    
    const wrapped = shallow(<App/>) ;
    
    expect(wrapped.find(ComentBox).length).toEqual(1);
    
    

});