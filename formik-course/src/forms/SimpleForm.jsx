import React from 'react';
import {Formik} from 'formik';

const SimpleForm = () => {
    return(
        <Formik
        onSubmit
        >
            {
                ({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Enter your name" />
                        <button>Submit</button>
                    </form>
                )
            }
        </Formik>
    );
}

export default SimpleForm;