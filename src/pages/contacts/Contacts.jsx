import './contacts.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const Contacts = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="contacts" />
                <div className="container">Contacts</div>
            </div>
        </>
    )
}

export default Contacts
