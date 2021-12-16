import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector } from 'react-redux';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function EventDashboard() {
  // our eventReducer is called event
  // initial state is called events
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  if (loading) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* without using the key in the EventForm it will lead to not update the props by not rerendring the component */}
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
