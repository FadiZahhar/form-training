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

    // to get out the checked inputs
    const role = this.form.role
    const roleArray = Array.prototype.slice.call(role)
    const checkRoleArray = roleArray.filter(input => input.checked)
    const checkValues = checkRoleArray.map(input => input.value)

    alert(checkValues)
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

        <div className={styles.form_group}>
          <input type="checkbox" name="role" value="Designer" /> Designer
          <input type="checkbox" name="role" value="Frontend" /> Frontend
          <input type="checkbox" name="role" value="Backend" /> Backend
        </div>
        <button className={styles.button}>Submit</button>

      </form>


    );
  }

}

export default App;
