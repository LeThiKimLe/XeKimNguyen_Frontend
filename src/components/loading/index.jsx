import styles from './styles.module.css'

const Loading = () => {
    return(
        <div className={styles['loading-container']}>
                <img src="./bus1_2x.gif" alt="Example GIF" />
        </div>
    )
}

export default Loading