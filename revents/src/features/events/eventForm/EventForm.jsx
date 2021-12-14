import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();

  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  // ?? used if selectedEvent is null then will go to empty values else its will be selectedEvent
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // we got all the attribitues in the selectedEvent(contains all things JSON not just the values of the form), and overite them with the values of form
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: './assets/user.png',
                })
              );
          history.push('/events');
        }}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event Details" />
          <MyTextInput name="title" placeholder="Event title" />
          <MyTextInput name="category" placeholder="category" />
          <MyTextInput name="description" placeholder="description" />
          <Header sub color="teal" content="Event Location Details" />
          <MyTextInput name="city" placeholder="city" />
          <MyTextInput name="venue" placeholder="venue" />
          <MyTextInput name="date" placeholder="date" type="date" />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/events"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
