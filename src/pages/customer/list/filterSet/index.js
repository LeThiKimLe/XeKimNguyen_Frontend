import styles from './style.module.css'
import { memo } from 'react'

const FilterSet = ({type, title, options, onChange}) => {
    if (type === 'checkbox')
    {
    return(
        <div className={styles.lsItem}>
            <label htmlFor="" className={styles.lsItemTitle}>{title}</label>
            <div className={styles.timeOptionContainer}>
                {Object.entries(options).map(([key, value]) => (
                    <div className={styles.timeOptionItem}>
                        <label htmlFor={key} className={styles.timeLabel}>
                            <input type="checkbox"
                                name={key}
                                checked={value.value}
                                onChange={onChange}
                                className={styles.timeOption} />
                            {`  ${value.label}`}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
    }
    else{
    return(
        <div className={styles.lsItem}>
            <label htmlFor="" className={styles.lsItemTitle}>{title}</label>
            <div className={styles.optionContainer}>
                {Object.entries(options).map(([key, value]) => (
                    <div className={value.value === true ? 
                        `${styles.optionChoice} ${styles['optionChoice-active']}` 
                        : styles.optionChoice} 
                        onClick={onChange} 
                        data-name={key}>
                        {value.label}
                    </div>
                ))}
            </div>
        </div>
    )
    }
}

export default memo(FilterSet)

