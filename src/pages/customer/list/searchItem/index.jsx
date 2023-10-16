import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faLocationDot,faBusSimple } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const SearchItem = ({trip}) => {

    const navigate = useNavigate()

    const handleChooseTrip = () => {
        navigate(`/trip/${trip}`)
    }

    return(
        <div className={styles.searchResult}>
            <div className={styles.routeTime}>
                <div>9h</div>
                <div className={styles.distanceRoute}>
                    <FontAwesomeIcon icon={faCircleDot} className={styles.startRoute}/>
                    <div className={styles.dotDistance}></div>
                    <div className={styles.hourRoute}>9 tiếng</div>
                    <div className={styles.dotDistance}></div>
                    <FontAwesomeIcon icon={faLocationDot} className={styles.endRoute}/>
                </div>
                <div>18h</div>
            </div>
            <div className={styles.routeLocation}>
                <div className={styles.routePoint}>VP Cam Ranh</div>
                <div className={`${styles.routePoint} ${styles.endPoint}`}>Bến xe Miền Đông mới</div>
            </div>
            <div className={styles.busType}>
                <FontAwesomeIcon icon={faBusSimple} className={styles.typeIcon} />
                Xe giường nằm 42 chỗ
            </div>
            <div className={styles.seatBlank}>* Còn 1 ghế</div>
            <div className={styles.split}></div>
            <div className={styles.note}> *Vé chặng thuộc chuyến Nha Trang - Sài Gòn (8h - Ngày 05/09/2023) </div>
            <div className={styles.ticketPrice} >900.000đ</div>
            <div className={styles.bookTicket}>
            <div className={styles.bookBtn} onClick={handleChooseTrip}>Chọn chuyến</div>
            </div>
        </div>
    )
}

export default SearchItem
