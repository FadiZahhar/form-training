import React from 'react'
import styles from './CustomInput.module.css';

const CustomInput = ({ inputRef, ...props }) => {
    return (
        <div>
            <input ref={inputRef} {...props} className={styles.form_control} />
        </div>
    )
}

export default CustomInput;