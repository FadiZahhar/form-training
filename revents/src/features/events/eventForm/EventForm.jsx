import React from 'react';
import { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Formik } from 'formik';

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
  const [values, setValues] = useState(initialValues);
  function handleFormSubmit() {
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
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {/* values ,handleChange,handleSubmit are the props */}
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <input
                type="text"
                placeholder="Event title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="text"
                placeholder="Venue"
                name="venue"
                value={values.venue}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <input
                type="date"
                placeholder="Date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Button type="submit" floated="right" positive content="Submit" />
              <Button
                as={Link}
                to="/events"
                type="submit"
                floated="right"
                content="Cancel"
              />
            </Form.Field>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
