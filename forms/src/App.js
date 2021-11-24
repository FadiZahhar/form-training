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

    alert(name)
    alert(password)
    alert(gender)
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit}>

        <div className={styles.form_group}>
          <CustomInput name="name" type="text" placeholder="Name" inputRef={input => this.nameRef = input} />
        </div>

        <div className={styles.form_group}>
          <CustomInput name="password" type="password" placeholder="Password" inputRef={input => this.passwordRef = input} />
        </div>

        <div className={styles.form_group}>
          {/* <select name="gender" ref={input => this.genderRef = input} className={styles.form_control}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select> */}

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


        <button className={styles.button}>Submit</button>

      </form>


    );
  }

}

export default App;
