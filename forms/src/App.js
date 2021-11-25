import React from 'react'
import styles from './App.module.css';

import useForm from './useForm';
import { minimumLengthValidation, requiredValidation } from './validation'

function App() {

  const FIELDS = {
    name: {
      value: '',
      validations: [
        requiredValidation
      ]
    },
    password: {
      value: '',
      validations: [
        requiredValidation,
        minimumLengthValidation(5)

      ]
    },
    address: {
      value: '',
      validations: [
        requiredValidation,
        minimumLengthValidation(10)

      ]
    },
    gender: {
      value: '',
      validations: [
        requiredValidation,
      ]
    },
  }

  const { fields, isValid, handleChange, formHandler } = useForm(FIELDS)

  return (
    <form className={styles.container} onSubmit={event => formHandler(event)} >

      <div className={styles.form_group}>
        <input
          name="name"
          type="text"
          value={fields.name.value}
          placeholder="Name"
          className={styles.form_control}

          onChange={event => handleChange(event)}
        />
        {fields.name.touched && fields.name.errors && fields.name.errors.map(error => (
          <div key={error}>{error}</div>
        ))}
      </div>
      <div className={styles.form_group}>
        <input
          name="password"
          type="password"
          value={fields.password.value}
          placeholder="Password"
          className={styles.form_control}
          onChange={event => handleChange(event)}
        />
        {fields.password.touched && fields.password.errors && fields.password.errors.map(error => (
          <div key={error}>{error}</div>
        ))}
      </div>
      <div className={styles.form_group}>
        <textarea
          name="address"
          value={fields.address.value}
          className={styles.form_control}
          placeholder='Address'
          onChange={event => handleChange(event)}
        >
        </textarea>
        {fields.address.touched && fields.address.errors && fields.address.errors.map(error => (
          <div key={error}>{error}</div>
        ))}
      </div>

      <div className={styles.form_group}>
        <select
          name="gender"
          value={fields.gender.value}
          className={styles.form_control}
          onChange={event => handleChange(event)}
        >
          <option value="">Pick Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {fields.gender.touched && fields.gender.errors && fields.gender.errors.map(error => (
          <div key={error}>{error}</div>
        ))}
      </div>

      <button className={styles.button} disabled={!isValid}>Submit</button>

    </form>


  );


}

export default App;
