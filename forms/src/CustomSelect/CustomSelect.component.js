import React from 'react'
import styles from './CustomSelect.module.css';

const CustomSelect = ({ inputRef, options, ...props }) => {
    return (
        <div>
            <select
                ref={inputRef}
                {...props}
                className={styles.form_control}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CustomSelect;