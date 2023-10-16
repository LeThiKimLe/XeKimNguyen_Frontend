import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'

const Bill = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="bill"/>
                <div className={styles.container}>Bill</div>
            </div>
        </>
    )
}

export default Bill
