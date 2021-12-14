import React from 'react';
import { Button, Header, Segment, FormField, Label } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from './../../../app/common/form/MyTextInput';

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
  });

  // function handleFormSubmit() {
  //   // we got all the attribitues in the selectedEvent(contains all things JSON not just the values of the form), and overite them with the values of form
  //   selectedEvent
  //     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
  //     : dispatch(
  //         createEvent({
  //           ...values,
  //           id: cuid(),
  //           hostedBy: 'Bob',
  //           attendees: [],
  //           hostPhotoURL: './assets/user.png',
  //         })
  //       );
  //   history.push('/events');
  // }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="ui form">
          <MyTextInput name="title" placeholder="Event title" />
          <FormField>
            <Field name="category" placeholder="category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="city" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="venue" />
          </FormField>
          <FormField>
            <Field name="date" placeholder="date" type="date" />
          </FormField>

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
