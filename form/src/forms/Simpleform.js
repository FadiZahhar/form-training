import React from 'react';
import {Formik,ErrorMessage} from 'formik';

const Simpleforms = () => {
    return(
        <Formik 
        initialValues={{name: ''}}
        onSubmit={(values,{setSubmitting})=>{
            setTimeout(()=>{
                console.log("form values:",values);
                setSubmitting(false)
            },5000)
        }}
        validate={values=>{
            let errors={}
            if (!values.name){
                errors.name="Please enter a name"
            }
            return errors;
        }}
                   render= {
                ({handleSubmit,handleChange,values,errors,handleBlur,touched,isSubmitting})=> ( 
                    <form onSubmit={handleSubmit}>
                        <input 
                        onChange={handleChange}
                        values={values.name} 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name"
                        onBlur={handleBlur}
                        />
                        <button disabled={isSubmitting}>Submit</button>

                    <ErrorMessage name="name"/>
                   </form>
                )
            }
            >

           
               
            

         
        </Formik>
    )
}

export default Simpleforms