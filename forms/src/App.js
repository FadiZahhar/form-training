import React, { Component } from 'react'
import styles from './App.module.css';
import CustomInput from './CustomInput/CustomInput.component';


class App extends React.Component {

  handleSubmit = event => {
    event.preventDefault();

    const name = this.nameRef.value
    const password = this.passwordRef.value

    alert(name)
    alert(password)
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
        <button className={styles.button}>Submit</button>


      </form>


    );
  }

}

export default App;
