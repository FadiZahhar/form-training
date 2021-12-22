import MyTextArea from '../../../app/common/form/MyTextArea';
import { Formik, Form } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { Button } from 'semantic-ui-react';

export default function EventDetailedChatForm({ eventId }) {
  return (
    <div>
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addEventChatComment(eventId, values.comment);
            resetForm();
          } catch (error) {
            toast.error(error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="ui form">
            <MyTextArea
              name="comment"
              placeholder="Please Enter your comment here"
              rows={2}
            />
            <Button
              type="submit"
              loading={isSubmitting}
              content="Add reply"
              icon="edit"
              primary
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
