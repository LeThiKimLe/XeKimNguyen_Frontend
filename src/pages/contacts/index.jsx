import styles from './styles.module.css'
import Navbar from '../../components/navbar'
import Header from '../../components/header'

const Contacts = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="contacts" />
                <div className={styles.container}>Contacts</div>
            </div>
        </>
    )
}

export default Contacts
