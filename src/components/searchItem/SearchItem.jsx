import './searchItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faLocationDot,faBusSimple } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const SearchItem = ({trip}) => {

    const navigate = useNavigate()

    const handleChooseTrip = () => {
        navigate(`/trip/${trip}`)
    }

    return(
        <div className='searchResult'>
            <div className="routeTime">
                <div>9h</div>
                <div className="distanceRoute">
                    <FontAwesomeIcon icon={faCircleDot} className='startRoute'/>
                    <div className="dotDistance"></div>
                    <div className="hourRoute">9 tiếng</div>
                    <div className="dotDistance"></div>
                    <FontAwesomeIcon icon={faLocationDot} className='endRoute'/>
                </div>
                <div>18h</div>
            </div>
            <div className="routeLocation">
                <div className="routePoint">VP Cam Ranh</div>
                <div className="routePoint endPoint">Bến xe Miền Đông mới</div>
            </div>
            <div className="busType">
                <FontAwesomeIcon icon={faBusSimple} className='typeIcon' />
                Xe giường nằm 42 chỗ
            </div>
            <div className="seatBlank">* Còn 1 ghế</div>
            <div className="split"></div>
            <div className="note"> *Vé chặng thuộc chuyến Nha Trang - Sài Gòn (8h - Ngày 05/09/2023) </div>
            <div className='ticketPrice' >900.000đ</div>
            <div className="bookTicket">
                <div className="bookBtn" onClick={handleChooseTrip}>Chọn chuyến</div>
            </div>
        </div>

    )
}

export default SearchItem
