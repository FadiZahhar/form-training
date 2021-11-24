import React from 'react'
import styles from './App.module.css';
import { useState } from 'react';


function App() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const nameHandler = event => {
    const name = event.target.value

    setName(name)
  }
  const passwordHandler = event => {
    const password = event.target.value

    setPassword(password)
  }

  const formHandler = event => {
    event.preventDefault();

    alert(password)
    alert(name)

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
      </div>
      <div className={styles.form_group}>
        <input
          name="password"
          type="password"
          value={password}
          placeholder="password"
          className={styles.form_control}

          onChange={event => passwordHandler(event)}
        />
      </div>
      <button className={styles.button}>Submit</button>

    </form>


  );


}

export default App;
