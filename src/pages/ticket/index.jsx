import styles from './styles.module.css'
import Navbar from '../../components/navbar'
import Header from '../../components/header'

const Ticket = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="ticket" />
                <div className={styles.container}>Ticket</div>
            </div>
        </>
    )
}

export default Ticket
