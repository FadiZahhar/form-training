import React, { Component } from 'react'
import styles from './App.module.css';


class App extends React.Component {

  handleSubmit = event => {
    event.preventDefault();

    const name = this.nameRef.value

    alert(name)
  }

  render() {
    return (
      <form className={styles.container} onSubmit={this.handleSubmit}>
        <div className={styles.form_group}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className={styles.form_control}
            ref={input => this.nameRef = input}
          />

        </div>
        <button className={styles.button}>Submit</button>


      </form>


    );
  }

}

export default App;
