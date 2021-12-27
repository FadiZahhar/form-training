import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import {ToastContainer} from 'react-toastify';


export default function App() {
  const {key} = useLocation();
 

  return (
    <>
    <ModalManager/>
    <ToastContainer position='bottom-right' theme='colored' hideProgressBar/>
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} render={()=>(
              
              <>
              <NavBar />
      
        <Container className='main'>
          
          <Route exact path='/events' component={EventDashboard}/>
          <Route exact path='/sandbox' component={Sandbox}/>
          <Route path="/events/:id" component={EventDetailedPage}/>
          <Route path={['/createEvent','/manage/:id']} component={EventForm} key={key}/>
        </Container>
        </>
      )}></Route>

    </>
  );
}

 