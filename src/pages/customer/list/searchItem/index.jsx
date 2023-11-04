import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faLocationDot, faBusSimple } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { convertToStamp, addHoursToTime, convertToDisplayDate } from '../../../../utils/unitUtils'
import { selectSearchInfor } from '../../../../feature/search/seach.slice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/common/button'
import { tripActions } from '../../../../feature/trip/trip.slice'
import Trip from '../../trip'
import { useState } from 'react'

const SearchItem = ({ trip, sameTrip }) => {

    const dispatch = useDispatch()

    const searchInfor = useSelector(selectSearchInfor)

    const [selectTrip, setSelectTrip] = useState(false)

    const navigate = useNavigate()

    const handleChooseTrip = () => {
        dispatch(tripActions.getCurTrip(trip))
        navigate(`/trip/${trip.id}`)
    }

    const showDetailSelector =  () => {
        dispatch(tripActions.getCurTrip(trip))
        setSelectTrip(!selectTrip)
    }
    
    const startStation = trip.tripInfor.turn === true ? trip.tripInfor.startStation : trip.tripInfor.endStation
    const endStation = trip.tripInfor.turn === true ? trip.tripInfor.endStation : trip.tripInfor.startStation
    const departure = trip.tripInfor.turn ===  true? trip.tripInfor.route.departure : trip.tripInfor.route.destination
    const destination = trip.tripInfor.turn === true ? trip.tripInfor.route.destination : trip.tripInfor.route.departure

    return (
        <div className={styles.cover}>
            <div className={styles.searchResult}>
                <div className={styles.routeTime}>
                    <div>{trip.departTime.slice(0, -3)}</div>
                    <div className={styles.distanceRoute}>
                        <FontAwesomeIcon icon={faCircleDot} className={styles.startRoute} />
                        <div className={styles.dotDistance}></div>
                        <div className={styles.hourRoute}>{convertToStamp(trip.tripInfor.route.hours)}</div>
                        <div className={styles.dotDistance}></div>
                        <FontAwesomeIcon icon={faLocationDot} className={styles.endRoute} />
                    </div>
                    <div>{addHoursToTime(trip.departTime, trip.tripInfor.route.hours)}</div>
                </div>
                <div className={styles.routeLocation}>
                    <div className={styles.routePoint}>{startStation.name}</div>
                    <div className={`${styles.routePoint} ${styles.endPoint}`}>{endStation.name}</div>
                </div>
                <div className={styles.busType}>
                    <FontAwesomeIcon icon={faBusSimple} className={styles.typeIcon} />
                    {trip.tripInfor.route.busType.description}
                </div>
                <div className={styles.seatBlank}>{`* Còn ${trip.availability} ghế`}</div>
                <div className={styles.split}></div>
                {sameTrip ? (
                    <div>
                        <i><a href='#' onClick={showDetailSelector}>
                            {selectTrip === true ? 'Đóng' : 'Chọn chuyến' }
                        </a>
                        </i>
                        {selectTrip === true && (
                            <Trip tabStyle={true}></Trip>
                        )}
                    </div>
                ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <div className={styles.note}>
                        {searchInfor.searchRoute.id !== trip.tripInfor.route.id &&
                            <i> {`*Vé chặng thuộc chuyến ${departure.name} - ${destination.name} (${trip.departTime.slice(0, -3)} - Ngày ${convertToDisplayDate(trip.departDate)})`}</i>
                        }
                        {
                            trip.note &&
                            <p style={{color: '#af830a', margin: '5px 0'}}>{`*Lưu ý: ${trip.note}`}</p>
                        }
                    </div>
                    <div>
                        <div className={styles.ticketPrice} >{`${trip.ticketPrice.toLocaleString()} đ`}</div>
                        <Button className={styles.bookBtn} onClick={handleChooseTrip} text='Chọn chuyến'></Button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default SearchItem
