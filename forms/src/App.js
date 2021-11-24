import React from 'react'
import logo from './logo.svg';
import styles from './App.module.css';
import { useForm } from "react-hook-form"
import { useState } from 'react';
function App() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const nameHandler = event => {
    const name = event.target.value;

    setName(name);
  }
  const passwordHandler = event => {
    const password = event.target.value;

    setPassword(password);
  }
  const formHandler = event => {
    event.preventDefault();

    alert(name)
    alert(password)
  }
  return (
    <form className={styles.container} onSubmit={event => formHandler(event)} >
      <div className={styles.form_group}>
        <input
          name="name"
          type="text"
          value={name}
          placeholder="Name"
          className={styles.form_control}
          onChange={event => nameHandler(event)}
        />
        <input
          name="name"
          type="password"
          value={password}
          placeholder="Name"
          className={styles.form_control}
          onChange={event => passwordHandler(event)}
        />
      </div>
      <button className={styles.button}>Submit</button>


    </form>


  );
}

export default App;
