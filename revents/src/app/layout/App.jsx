import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/Navbar';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';

function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);
  if (!initialized) return <LoadingComponent content="Loading app..." />;
  return (
    // we use this method if we want to render specific page in different way like homePage we don't want NavBar and container
    <>
      <ModalManager />
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path="/account" component={AccountPage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
