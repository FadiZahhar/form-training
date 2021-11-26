import React from 'react'
import styles from './App.module.css';
import { useForm } from "react-hook-form";


const MyInput = ({ name, type, label, placeholder, register, required }) => {

  let input = (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(label, { required })}
        className={styles.form_control}
      />
    </div>
  )
  if (type === "textarea") {
    input = (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          {...register(label, { required })}
          className={styles.form_control}
          cols="4"
          rows="10"
        ></textarea>
      </div>
    )

  }
  return (
    <div>
      {input}
    </div>


  )
}

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
          {...register("name")}
          required
        />
      </div>
      <div className={styles.form_group}>
        <MyInput
          name="password"
          type="password"
          label="password"
          register={register}
          placeholder="Password"
          required
        />
      </div>

      <div className={styles.form_group}>
        <MyInput
          name="description"
          type="textarea"
          label="description"
          register={register}
          placeholder="description"
          required
        />
      </div>


      <button className={styles.button}>Submit</button>


    </form>
  );
}

export default App;
