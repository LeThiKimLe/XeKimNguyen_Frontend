import styles from './styles.module.css'

const SectionTitle = ({title, subtitle}) => {
    return(
        <div className={styles.sectionTitle}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
        </div>
    )
}

export default SectionTitle