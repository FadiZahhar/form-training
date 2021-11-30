import React from 'react'
import styles from './App.module.css';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import AsyncSelect, { useAsync } from 'react-select/async';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const MyInput = ({ name, type, label, placeholder, register, required }) => {

  let input = (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(label, {})}
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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ]

  // we can set her inside the useForm the default values that will appear in input placeholders
  const { handleSubmit, register, formState: { errors }, control } = useForm({
    defaultValues: {
      // name: 'Lamees',
      // select: options[1],
      // password: 'lam',
      // description: 'React form hook',
      mode: "all"

    }
  });

  const promiseOptions = async inputValue => {
    let response = await fetch(`http://localhost:7000/index?search=${inputValue}`)
    let data = await response.json()
    return data;

  }



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
          {...register("name", { required: "Name is required", minLength: { value: 5, message: 'Name cannot be less than 5' } })}

        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className={styles.form_group}>
        <MyInput
          name="password"
          type="password"
          label="Password"
          register={register}
          placeholder="Password"

        />
      </div>

      <div className={styles.form_group}>
        <input
          name="email"
          type="email"
          className={styles.form_control}
          placeholder="Email"
          label="email"
          {...register("email", {
            validate: {
              // exactEmail can be anyname its just represent the custom validation name 
              exactEmail: value => {
                return value === 'lameesaboudarwish@gmail.com' || 'Email must be related to Lamees'
              },
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Email is not a valid email'
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className={styles.form_group}>
        <MyInput
          name="description"
          type="textarea"
          label="Description"
          register={register}
          placeholder="description"

        />
      </div>

      <div className={styles.form_group}>
        {/* using this form of select won't work for validation 
        we have to use Controller that will act as Select */}
        {/* <Select options={options} /> */}
        <Controller

          name="select"
          rules={{ required: 'Select is required' }}
          control={control}
          render={({ field }) => <Select
            {...field}
            isMulti
            options={options}

          />}
        />
        {errors.select && <p>{errors.select.message}</p>}
      </div>




      <div className={styles.form_group}>
        <Controller
          control={control}
          name="autocomplete"
          render={({ field }) => <AsyncSelect
            {...field}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
          />}
        />
      </div>

      <div className={styles.form_group}>

        <Controller
          name="genderR"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          )}
        />
      </div>

      <button className={styles.button}>Submit</button>


    </form>
  );
}

export default App;
