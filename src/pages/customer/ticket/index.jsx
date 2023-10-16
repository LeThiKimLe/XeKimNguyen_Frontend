import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import FormInput from '../../../components/common/formInput'
import { TICKET_INFOR } from '../../../utils/constants'
import Button from '../../../components/common/button'
import {useState, useRef} from 'react'
import SectionTitle from '../../../components/common/sectionTitle'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'
import TicketInfor from './ticketInfor'
import { BOOKING_INFOR } from '../../../utils/test_data'

const Ticket = () => {
    const ticketInfor = TICKET_INFOR
    const [searchInfor, setSearchInfor] = useState({tel:'', booking_code:''})
    const captchaRef = useRef()
    const handleSearchInfor = (e) => {
        setSearchInfor({ ...searchInfor, [e.target.name]: e.target.value })
    }
    const [showTicket, setShowTicket] = useState(false)

    const handleSearchTicket = async (e) => {
        e.preventDefault()
        const token = captchaRef.current.getValue()
        captchaRef.current.reset()

        // await axios.post('http://localhost:2000/post', { searchInfor, token })
        // .then(res =>  console.log(res))
        // .catch((error) => {
        // console.log(error);
        // }
        // )
        setShowTicket(true)
    }

    return (
        <>
            <div>
                <Navbar></Navbar>
                <Header type="list" active="ticket" />
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <SectionTitle title='Tra cứu thông tin đặt vé'></SectionTitle>
                        <form action="" className={styles.formSearchTicket} onSubmit={handleSearchTicket}>
                            {ticketInfor.map((infor) => (
                                <FormInput key={infor.id} {...infor} 
                                           value={searchInfor[infor.name]} 
                                           onChange={handleSearchInfor}
                                           inputWidth = '73%'
                                           className={styles.inputInfor}>
                                </FormInput>
                            ))
                            }
                            <div className={styles.captcha}> 
                            <ReCAPTCHA  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                        ref={captchaRef}
                            ></ReCAPTCHA>
                            </div>
                            <Button text="Tra cứu vé" className={styles.searchBtn}></Button>
                        </form>
                        { showTicket===true ? (
                            <TicketInfor booking = {BOOKING_INFOR}></TicketInfor>
                        ) : null }
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Ticket
