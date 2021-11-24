import React, { Component } from 'react'
import styles from './App.module.css';
import CustomInput from './CustomInput/CustomInput.component';
import CustomSelect from './CustomSelect/CustomSelect.component';


class App extends React.Component {

  handleSubmit = event => {
    event.preventDefault();

    const name = this.nameRef.value
    const password = this.passwordRef.value
    const gender = this.genderRef.value
    const pet = this.form.pet.value


    alert(pet)
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit} ref={form => this.form = form}>

        <div className={styles.form_group}>
          <CustomInput name="name" type="text" placeholder="Name" inputRef={input => this.nameRef = input} />
        </div>

        <div className={styles.form_group}>
          <CustomInput name="password" type="password" placeholder="Password" inputRef={input => this.passwordRef = input} />
        </div>

        <div className={styles.form_group}>
          <CustomSelect
            name="gender"
            inputRef={input => this.genderRef = input}
            options={[
              {
                'label': 'Male',
                'value': 'Male'
              },
              {
                'label': 'Female',
                'value': 'Female'
              },
            ]}
          />
        </div>
        <div className={styles.form_group}>
          Dog <input type="radio" name="pet" value="Dog" />
          Cat <input type="radio" name="pet" value="Cat" />
        </div>

        <button className={styles.button}>Submit</button>

      </form>


    );
  }

}

export default App;
