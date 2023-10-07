import './about.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const About = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="about"/>
                <div className="container">About</div>
            </div>
        </>
    )
}

export default About
