import styles from './styles.module.css'
import Navbar from '../../components/navbar'
import Header from '../../components/header'

const Schedule = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="schedule"/>
                <div className={styles.container}>Schedule</div>
            </div>
        </>
    )
}

export default Schedule
