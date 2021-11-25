import React from 'react'
import styles from './App.module.css';
import { useForm } from "react-hook-form";

function App() {
  const { handleSubmit, register, errors } = useForm();

  const submitted = data => {
    console.log(data)
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit(submitted)} >
      <div className={styles.form_group}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className={styles.form_control}
          {...register('test', { required: true })}

        />

      </div>
      <button className={styles.button}>Submit</button>


    </form>
  );
}

export default App;
