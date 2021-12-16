import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import {
  dataFromSnapshot,
  getEventsFromFirestore,
} from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../../app/async/asyncReducer';

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = getEventsFromFirestore({
      next: (snapshot) => {
        dispatch(
          listenToEvents(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        );
        dispatch(asyncActionFinish());
      },
      error: (error) => dispatch(asyncActionError(error)),
      complete: () => console.log('you will never see this message'),
    });
    return unsubscribe;
  }, [dispatch]);

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
      </Grid.Column>
      <Grid.Column width={6}>
        {/* without using the key in the EventForm it will lead to not update the props by not rerendring the component */}
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
