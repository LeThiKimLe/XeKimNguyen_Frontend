import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import SeatMap from './seatmap'
import PickLocation from './pickLocation'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import FormInput from '../../../components/common/formInput'
import Button from '../../../components/common/button'
import Footer from '../../../components/footer'
import Message from '../../../components/message'
import { useSelector } from 'react-redux'
import { selectCurrentTrip } from '../../../feature/trip/trip.slice'
import { convertToTime, convertToDisplayDate } from '../../../utils/unitUtils'
import { selectUser } from '../../../feature/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bookingActions, selectBookingCode } from '../../../feature/booking/booking.slice'
import { selectLoading, selectError, selectMessage } from '../../../feature/booking/booking.slice'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import bookingThunk from '../../../feature/booking/booking.service'
import './custom.css'
import { selectChangeInfor, ticketAction, selectNewSeat } from '../../../feature/ticket/ticket.slice'

const Trip = ({ tabStyle }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const currentTrip = useSelector(selectCurrentTrip)
    const inforForm = useRef(null)
    const [message, setMessage] = useState({ message: '', messagetype: 2 })
    const loading = useSelector(selectLoading)
    const bookingCode = useSelector(selectBookingCode)

    const [pickLocation, setPickLocation] = useState(currentTrip.tripInfor.stopStations.filter((stop) => (
        currentTrip.tripInfor.turn === true ?
            stop.station.id === currentTrip.tripInfor.startStation.id
            : stop.station.id === currentTrip.tripInfor.endStation.id
    )
    )[0].id)
    const [dropLocation, setDropLocation] = useState(currentTrip.tripInfor.stopStations.filter((stop) =>
        currentTrip.tripInfor.turn === true ?
            stop.station.id === currentTrip.tripInfor.endStation.id
            : stop.station.id === currentTrip.tripInfor.startStation.id
    )[0].id)

    const handlePickLocation = useCallback((locationId) => {
        setPickLocation(locationId)
    }, [])

    const handleDropLocation = useCallback((locationId) => {
        setDropLocation(locationId)
    }, [])

    const [userInfor, setUserInfor] = useState(user ? {
        name: user.user.name,
        email: user.user.email,
        tel: user.user.tel
    } : {
        name: "",
        email: "",
        tel: ""
    })

    const userInput = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Họ và tên",
            errorMessage: "Tên không quá 30 ký tự",
            label: "Họ và tên",
            pattern: "^.{1,30}$",
            required: true
        },
        {
            id: 2,
            name: "tel",
            type: "text",
            placeholder: "Số điện thoại",
            errorMessage: "Sai số điện thoại",
            label: "Số điện thoại",
            pattern: "^0[0-9]{9,10}$",
            required: true

        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Email sai định dạng",
            label: "Email",
            required: true
        }
    ]

    const onChangeUserInfor = (e) => {
        setUserInfor({ ...userInfor, [e.target.name]: e.target.value })
    }

    const [isConfirmed, setConfirm] = useState(false);

    const handleConfirmChange = () => {
        setConfirm(!isConfirmed);
    };
    
    const changeInfor = useSelector(selectChangeInfor)
    const newInfor = useSelector(selectNewSeat)
    const [selectedSeats, setSelectedSeats] = useState(newInfor.length>0 ? newInfor : []);

    const handleSeatClick = useCallback((seatName) => {
        if (selectedSeats.includes(seatName)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
        } else {
            if (selectedSeats.length < 5)
                setSelectedSeats([...selectedSeats, seatName]);
            else {
                setMessage({ message: 'Chỉ chọn tối đa 5 vé', messagetype: message.messagetype + 1 })
            }
        }
    }, [selectedSeats, message.messagetype]);

    const handlePayment = () => {
        if (selectedSeats.length === 0)
            setMessage({ message: 'Vui lòng chọn chỗ', messagetype: message.messagetype + 1 })
        else if (!(inforForm.current.checkValidity()))
            setMessage({ message: 'Vui lòng điền đủ thông tin người mua', messagetype: message.messagetype + 1 })
        else if (isConfirmed === false)
            setMessage({ message: 'Vui lòng tích xác nhận điều khoản', messagetype: message.messagetype + 1 })
        else {
            const bookingInfor = {
                bookingTrip: currentTrip,
                bookingUser: userInfor,
                bookedSeat: selectedSeats,
                pickPoint: pickLocation,
                dropPoint: dropLocation
            }
            dispatch(bookingActions.saveInfor(bookingInfor))
            setMessage({message:'', messagetype:3})
            if (user)
                dispatch(bookingThunk.bookingForUser(bookingInfor))
                .unwrap()
                .then((response)=>{
                    navigate(`/payment/${response.code}`)  
                })
                .catch((error) => {
                    setMessage({message: error, messagetype: 2})
                })
            else
            {
                dispatch(bookingThunk.bookingForGuest(bookingInfor))
                .unwrap()
                .then((response)=>{
                    navigate(`/payment/${response.code}`)
                })
                .catch((error) => {
                    setMessage({message: error, messagetype: 2})
                })
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    const handleSeatTabStyle = useCallback((seatName) => {
        if (selectedSeats.includes(seatName)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
        } else {
            if (selectedSeats.length < changeInfor.length)
                setSelectedSeats([...selectedSeats, seatName]);
        }
    }, [selectedSeats, message.messagetype]);

    const handleNext = () => {
        dispatch(ticketAction.setNewChangeInfor(selectedSeats))
        dispatch(ticketAction.comeForward())
    }

    if (!tabStyle) {
        return (
            <>
                {message.message !== '' && <Message message={message.message} messagetype={message.messagetype} />}
                <div>
                    <Navbar></Navbar>
                    <Header type="list" />
                    <div className={styles.trip_container}>
                        <div className={styles.trip_wrapper}>
                            <div className={styles.trip_infor}>
                                <div className={styles.infor_segment}>
                                    <h2>Chọn ghế</h2>
                                    <SeatMap seatMap={currentTrip.tripInfor.route.busType.seatMap} booked={currentTrip.tickets.filter((tk) => tk.state !== "Đã hủy" && tk.state !== "Chờ hủy")} selectedSeats={selectedSeats} handleSeatClick={handleSeatClick}></SeatMap>
                                </div>
                                <div className={styles.infor_segment}>
                                    <h2>Thông tin đón trả</h2>
                                    <div className={styles.pick_area}>
                                        <PickLocation pick={true} listLocation={currentTrip.tripInfor.stopStations.filter((station) => station.stationType === 'pick')} setLocation={handlePickLocation} selected={pickLocation}></PickLocation>
                                        <PickLocation pick={false} listLocation={currentTrip.tripInfor.stopStations.filter((station) => station.stationType === 'drop')} setLocation={handleDropLocation} selected={dropLocation}></PickLocation>
                                    </div>
                                </div>
                                <div className={styles.infor_segment}>
                                    <div className={styles.user_infor_container}>
                                        <form className={`${styles.infor_box} ${styles.personal_infor}`} ref={inforForm}>
                                            <h2>Thông tin khách hàng</h2>
                                            {userInput.map((input) => (
                                                <FormInput key={input.id} {...input}
                                                    value={userInfor[input.name]}
                                                    onChange={onChangeUserInfor}
                                                    inputWidth='80%'
                                                >
                                                </FormInput>
                                            ))}
                                        </form>
                                        <div className={`${styles.infor_box} ${styles.policy_infor}`}>
                                            <h2>Điều khoản và lưu ý</h2>
                                            <div className={styles.policy_content}>
                                                (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành,
                                                mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống XE KIM NGUYÊN.
                                                Vui lòng liên hệ Trung tâm tổng đài 084-228-1119 để được hỗ trợ.
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.infor_confirm}>
                                        <input
                                            type="checkbox"
                                            checked={isConfirmed}
                                            onChange={handleConfirmChange}
                                        />
                                        <label>Chấp nhận điều khoản đặt vé & chính sách bảo mật thông tin của Xe Kim Nguyên</label>
                                    </div>
                                </div>
                                <div className={styles.payment_direct}>
                                    <span>{`Tổng cộng: ${(currentTrip.ticketPrice * selectedSeats.length).toLocaleString()} đ`}</span>
                                    <Button text="Thanh toán"
                                            className={styles.btnCheckout}
                                            onClick={handlePayment}
                                            loading = {loading}
                                        >
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.trip_sum}>
                                <h3 className={styles.sum_title}>Thông tin lượt đi</h3>
                                <div className={styles.sum_infor}>
                                    <span className={styles.sum_infor_title}>Chuyến xe</span>
                                    {currentTrip.tripInfor.turn === true ? (
                                        <span className={styles.sum_infor_value}>{`${currentTrip.tripInfor.startStation.name} ⇒ ${currentTrip.tripInfor.endStation.name}`}</span>
                                    ) : (
                                        <span className={styles.sum_infor_value}>{`${currentTrip.tripInfor.endStation.name} ⇒ ${currentTrip.tripInfor.startStation.name}`}</span>
                                    )}
                                </div>
                                <div className={styles.sum_infor}>
                                    <span className={styles.sum_infor_title}>Thời gian</span>
                                    <span className={styles.sum_infor_value}>{`${currentTrip.departTime.slice(0, -3)} ${convertToDisplayDate(currentTrip.departDate)}`}</span>
                                </div>
                                <div className={styles.sum_infor}>
                                    <span className={styles.sum_infor_title}>Số lượng ghế</span>
                                    <span className={styles.sum_infor_value}>{`${selectedSeats.length} ghế`}</span>
                                </div>
                                <div className={styles.sum_infor}>
                                    <span className={styles.sum_infor_title}>Vị trí ghế</span>
                                    <span className={styles.sum_infor_value}>{selectedSeats.join(', ')}</span>
                                </div>
                                <div className={styles.sum_infor}>
                                    <span className={styles.sum_infor_title}>Tổng tiền</span>
                                    <span className={styles.sum_infor_value}>{`${(currentTrip.ticketPrice * selectedSeats.length).toLocaleString()} đ`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </>
        )
    }
    else {
        return (
            <div className={`tabStyle ${styles.tabStyle}`}>
                <Tabs>
                    <TabList>
                        <Tab>Chọn ghế</Tab>
                    </TabList>
                    <TabPanel>
                        <SeatMap seatMap={currentTrip.tripInfor.route.busType.seatMap}
                                 booked={currentTrip.tickets}
                                 selectedSeats={selectedSeats}
                                 handleSeatClick={handleSeatTabStyle}>
                        </SeatMap>
                        <Button onClick={handleNext} text='Tiếp tục'></Button>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Trip
