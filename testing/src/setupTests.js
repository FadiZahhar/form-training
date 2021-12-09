// the name of file is very special because everytime
// JEST starts up inside of proj it's going to look 
// fo a file name with 'setupTests.js' inside src directory
// and automatically execute it before any other code

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })