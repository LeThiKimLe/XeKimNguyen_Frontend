import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import bookingThunk from '../../../../feature/booking/booking.service'
import { selectUserBookingHistory } from '../../../../feature/booking/booking.slice'
import { useDispatch } from 'react-redux'
import { convertToDisplayDate } from '../../../../utils/unitUtils'
import { TICKET_STATE_DICTIONARY } from '../../../../utils/constants'

const TripInfor = () => {

    const dispatch = useDispatch()
    const userHistory = useSelector(selectUserBookingHistory)
    const userTickets = useRef([])
    const [currentTicket, setCurrentTicket] = useState([])
    console.log(userHistory)
    useEffect(()=>{
        dispatch(bookingThunk.getUserHistory())
    }, [])
    
    useEffect(() => {
        const convertToListTicket = () => {
            const listTicket = []
            if (userHistory.length !== 0) {
                userHistory.forEach((booking) => {
                    const { tickets, ...bookingInfor } = booking
                    tickets.forEach((ticket) => {
                        listTicket.push({
                            ...ticket,
                            bookingInfor: bookingInfor
                        })
                    })
                })
            }
            return listTicket
        }
        userTickets.current = convertToListTicket()
        setCurrentTicket(getRecentTrip())
    }, [userHistory])

    const getDate = (date, time) => {
        const dateTimeString = date + 'T' + time;
        return new Date(Date.parse(dateTimeString));
    }

    const compareByTime = (a, b) => {
        const currentTime = new Date()
        const timeDifferenceA = Math.abs(getDate(a.schedule.departDate, a.schedule.departTime) - currentTime);
        const timeDifferenceB = Math.abs(getDate(b.schedule.departDate, b.schedule.departTime) - currentTime);
        return timeDifferenceA - timeDifferenceB;
    };

    const getStatus = (status) => {
        return TICKET_STATE_DICTIONARY.filter((state) => state.value === status)[0].key
    }

    const getRecentTrip = () => {
        if (userTickets.current.length !== 0) {
            const notDepartList = userTickets.current.filter((ticket) => getDate(ticket.schedule.departDate, ticket.schedule.departTime) > new Date() && getStatus(ticket.state) === 'success')
            if (notDepartList.length !== 0) {
                const soon = notDepartList.sort(compareByTime)
                const firstList = [soon[0]]
                soon.slice(1).forEach((ticket) => {
                    if (ticket.bookingInfor.code === soon[0].bookingInfor.code
                        && ticket.schedule.departDate === soon[0].schedule.departDate
                        && ticket.schedule.departTime === soon[0].schedule.departTime)
                        firstList.push(ticket)
                    else {
                        return firstList
                    }
                })
                return firstList
            }
            else
                return []
        }
        else
            return []
    }

    return (
        <div>
            {currentTicket.length !== 0 ?
                (
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <FontAwesomeIcon icon={faBell} />
                            Bạn có chuyến xe sắp khởi hành
                        </div>
                        <p className={styles.infor}>
                            <i>Chuyến xe: </i>
                            {
                                currentTicket[0].bookingInfor.trip.turn === true ? (
                                    <b>{currentTicket[0].bookingInfor.trip.startStation.name} - 
                                        {currentTicket[0].bookingInfor.trip.endStation.name}
                                    </b>
                                ) : (
                                    <b>{currentTicket[0].bookingInfor.trip.endStation.name} - 
                                        {currentTicket[0].bookingInfor.trip.startStation.name}
                                    </b>
                                )
                            }
                            <b></b>
                        </p>
                        <p className={styles.infor}>
                            <i>Thời gian: </i>
                            <b>{`${currentTicket[0].schedule.departTime.slice(0,-3)} - Ngày ${convertToDisplayDate(currentTicket[0].schedule.departDate)}`}</b>
                        </p>
                        <p className={styles.infor}>
                            <i>Điểm đón: </i>
                            <b>{currentTicket[0].bookingInfor.pickStation.station.name}</b>
                        </p>

                        <p className={styles.infor}>
                            <i>Ghế: </i>
                            <b>{currentTicket.map((ticket)=> ticket.seat).join()}</b>
                        </p>
                    </div>
                )
                : (
                    null
                )
            }
        </div>
    )
}

export default TripInfor