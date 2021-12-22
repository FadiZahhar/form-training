import MyTextArea from '../../../app/common/form/MyTextArea';
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { addEventChatComment } from '../../../app/firestore/firebaseService';
import { Button, Loader } from 'semantic-ui-react';

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
        {({ isSubmitting, handleSubmit }) => (
          <Form className="ui form">
            <Field name="comment">
              {({ field }) => (
                <div style={{ position: 'relative' }}>
                  <Loader active={isSubmitting} />
                  <textarea
                    rows="2"
                    {...field}
                    placeholder="Enter your comment (Enter to submit, SHIFR + Enter for new line) "
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.shiftKey) {
                        return;
                      }
                      if (e.key === 'Enter' && !e.shiftKey) {
                        handleSubmit();
                      }
                    }}
                  ></textarea>
                </div>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
}
