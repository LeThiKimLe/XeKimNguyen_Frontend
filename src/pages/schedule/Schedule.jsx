import './schedule.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const Schedule = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="schedule"/>
                <div className="container">Schedule</div>
            </div>
        </>
    )
}

export default Schedule
