import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faLocationDot, faBusSimple } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { convertToStamp, convertToTime, calculateTimeInDay } from '../../../../utils/unitUtils'
import { selectSearchInfor } from '../../../../feature/search/seach.slice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/common/button'
import { tripActions } from '../../../../feature/trip/trip.slice'

const SearchItem = ({ trip }) => {

    const dispatch = useDispatch()

    const searchInfor = useSelector(selectSearchInfor)

    const navigate = useNavigate()

    const handleChooseTrip = () => {
        dispatch(tripActions.getCurTrip(trip))
        navigate(`/trip/${trip.id}`)
    }

    return (
        <div className={styles.cover}>
            <div className={styles.searchResult}>
                <div className={styles.routeTime}>
                    <div>{convertToTime(trip.departTime)}</div>
                    <div className={styles.distanceRoute}>
                        <FontAwesomeIcon icon={faCircleDot} className={styles.startRoute} />
                        <div className={styles.dotDistance}></div>
                        <div className={styles.hourRoute}>{convertToStamp(trip.route.hours)}</div>
                        <div className={styles.dotDistance}></div>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.endRoute} />
                    </div>
                    <div>{calculateTimeInDay(trip.departTime, trip.route.hours)}</div>
                </div>
                <div className={styles.routeLocation}>
                    <div className={styles.routePoint}>{trip.startStation.name}</div>
                    <div className={`${styles.routePoint} ${styles.endPoint}`}>{trip.endStation.name}</div>
                </div>
                <div className={styles.busType}>
                    <FontAwesomeIcon icon={faBusSimple} className={styles.typeIcon} />
                    {trip.bus.busType.description}
                </div>
                <div className={styles.seatBlank}>{`* Còn ${trip.availability} ghế`}</div>
                <div className={styles.split}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div className={styles.note}>
                        {searchInfor.searchRoute.id !== trip.route.id &&
                            <i> {`*Vé chặng thuộc chuyến ${trip.route.departure.name} - ${trip.route.destination.name} (${convertToTime(trip.departTime)} - Ngày ${trip.departDate})`}</i>
                        }
                        <p style={{color: '#af830a', margin: '5px 0'}}>{`*Lưu ý: ${trip.note}`}</p>
                    </div>
                    <div>
                        <div className={styles.ticketPrice} >{`${trip.ticketPrice.toLocaleString()} đ`}</div>
                        <Button className={styles.bookBtn} onClick={handleChooseTrip} text='Chọn chuyến'></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItem
