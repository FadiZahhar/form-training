// App.test.js the test is only for clarifying its test file we can name it anything
/**
 * Notes about Test Structure
 * The IT function is used to organize all the different tests that we write inside of a single file,
 * it is a global function , takes two arguments one for the description and other for the test logic function
 * JEST which is resposible for automated test runner , runs inside command line env 
 * react runs in browser but Jest in command line so we have JSDOM dependency implementation on how javascript browser works
 * But that's good enough to fill out, react and make it think that it's actually working directly inside
 * of a browser.
 * JSDOM stimulates how browser works
 */
import React from 'react'
// import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import App from 'components/App'
import CommentBox from 'components/CommentBox'
import CommentList from 'components/CommentList'


// Common Setup logic

let wrapped;

beforeEach(() => {
    // shallow renders just the component without the children 
    wrapped = shallow(<App />);
})

it('shows a comment box', () => {
    expect(wrapped.find(CommentBox).length).toEqual(1)
})

it('shows a comment List', () => {
    expect(wrapped.find(CommentList).length).toEqual(1)
})

// old way 

// it('shows a comment box', () => {

//     // // their is no div inside the browser, no chrome/firefox.. here so its a fake div
//     // const div = document.createElement('div')

//     // // react will take the App component =>takes the html produced by this component and stick it to the div element
//     // ReactDOM.render(<App />, div)

//     // // Looks inside the div
//     // // and checks to see if the CommentBox is in there

//     // // this way is Limiting test Knowledge not recommended
//     // // expect(div.innerHTML).toContain('Comment Box')

//     // // better way by using Enzyme open source package 
//     // // made for testing to be a little bit easier


//     // // this is like a cleanup ,
//     // // it will found the app component that we rendered
//     // // and it will remove it
//     // ReactDOM.unmountComponentAtNode(div)
// })