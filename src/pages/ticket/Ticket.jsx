import './ticket.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const Ticket = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="ticket" />
                <div className="container">Ticket</div>
            </div>
        </>
    )
}

export default Ticket
