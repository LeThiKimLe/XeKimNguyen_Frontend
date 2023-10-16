import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'

const About = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="about"/>
                <div className={styles.container}>About</div>
            </div>
        </>
    )
}

export default About
