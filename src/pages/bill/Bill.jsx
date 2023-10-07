import './bill.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'

const Bill = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="bill"/>
                <div className="container">Bill</div>
            </div>
        </>
    )
}

export default Bill
