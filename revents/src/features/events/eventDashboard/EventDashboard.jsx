import React, { useEffect, useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { fetchEvents, listenToEvents } from '../eventActions';

import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import {
  fetchEventsFromFirestore,
  listenToEventsFromFirestore,
} from '../../../app/firestore/firestoreService';
import EventsFeed from './EventsFeed';

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
    });
  }, [dispatch, predicate]);

  function handleFetchNextEvents() {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(
      (lastVisible) => {
        setLastDocSnapshot(lastVisible);
      }
    );
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList events={events} />
        <Button
          onClick={handleFetchNextEvents}
          color="green"
          content="More..."
          floated="right"
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* without using the key in the EventForm it will lead to not update the props by not rerendring the component */}
        {authenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
}
