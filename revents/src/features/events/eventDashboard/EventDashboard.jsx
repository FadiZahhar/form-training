import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector } from 'react-redux';

export default function EventDashboard() {
  // our eventReducer is called event
  // initial state is called events
  const { events } = useSelector((state) => state.event);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }
  // function handleUpdateEvent(updatedEvent) {
  //   setEvents(
  //     events.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
  //   );
  //   selectEvent(null);
  // }

  function handleDeleteEvent(eventId) {
    // setEvents(events.filter((evt) => evt.id !== eventId));
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* without using the key in the EventForm it will lead to not update the props by not rerendring the component */}
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
