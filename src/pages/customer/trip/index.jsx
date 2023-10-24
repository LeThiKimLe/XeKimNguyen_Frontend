import styles from'./styles.module.css'
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
import { convertToTime } from '../../../utils/unitUtils'
import { selectUser } from '../../../feature/auth/auth.slice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bookingActions } from '../../../feature/booking/booking.slice'

const Trip = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const currentTrip = useSelector(selectCurrentTrip)
    const booked = useRef(['A01', 'A02', 'B09', 'B10'])
    const inforForm = useRef(null)
    const [message, setMessage] = useState({message:'', messagetype:2})
    const listPick = useRef([
        {
            id: 1,
            name: "Văn phòng Cam Ranh",
            address: "123 Đại Lộ Hùng Vương",
            time: "18:00",
            is_departure: true,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 2,
            name: "Ngã ba Mỹ Ca",
            address: "Hùng Vương, Cam Nghĩa, Cam Ranh, Khánh Hòa",
            time: "19:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 3,
            name: "Chợ Số 9 - Nguyễn Văn Trỗi",
            address: "97 Nguyễn Văn Trỗi, Phường Cam Phúc Bắc, Cam Ranh, Khánh Hòa",
            time: "20:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 4,
            name: "Công ty Yến Sào Khánh Hòa",
            address: "QL1A, Cam Thịnh Đông, Xã Cam Thịnh Đông, Cam Ranh, Khánh Hòa",
            time: "21:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 5,
            name: "Công ty Yến Sào Khánh Hòa",
            address: "QL1A, Cam Thịnh Đông, Xã Cam Thịnh Đông, Cam Ranh, Khánh Hòa",
            time: "21:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 6,
            name: "Công ty Yến Sào Khánh Hòa",
            address: "QL1A, Cam Thịnh Đông, Xã Cam Thịnh Đông, Cam Ranh, Khánh Hòa",
            time: "21:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        }
    ])

    const listDrop = useRef([
        {
            id: 1,
            name: "Văn phòng Xa lộ Hà Nội",
            address: "123 Đại Lộ Hùng Vương",
            time: "4:00",
            is_departure: true,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 2,
            name: "Ngã tư Thủ Đức",
            address: "Hùng Vương, Cam Nghĩa, Cam Ranh, Khánh Hòa",
            time: "5:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 3,
            name: "Bến xe Miền Đông",
            address: "97 Nguyễn Văn Trỗi, Phường Cam Phúc Bắc, Cam Ranh, Khánh Hòa",
            time: "6:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        },
        {
            id: 4,
            name: "Bến xe Miền Tây",
            address: "QL1A, Cam Thịnh Đông, Xã Cam Thịnh Đông, Cam Ranh, Khánh Hòa",
            time: "7:00",
            is_departure: false,
            url: "https://www.google.com/maps/search/BX%20NG%C3%83%204%20GA"
        }
    ])

    const [pickLocation, setPickLocation] = useState(1)
    const [dropLocation, setDropLocation] = useState(1)

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

    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleSeatClick = useCallback((seatName) => {
        if (selectedSeats.includes(seatName)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
        } else {
            if (selectedSeats.length<5)
                setSelectedSeats([...selectedSeats, seatName]);
            else
            {
                setMessage({message:'Chỉ chọn tối đa 5 vé', messagetype:message.messagetype+1})
            }
        }
    }, [selectedSeats, message.messagetype]);

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
      
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
      
        return code;
      }

    const handlePayment = () => {
        if (selectedSeats.length === 0)
            setMessage({message:'Vui lòng chọn chỗ', messagetype:message.messagetype+1})
        else if (!(inforForm.current.checkValidity()))
            setMessage({message:'Vui lòng điền đủ thông tin người mua', messagetype:message.messagetype+1})
        else if (isConfirmed===false)
            setMessage({message:'Vui lòng tích xác nhận điều khoản', messagetype:message.messagetype+1})
        else{
            const bookingCode = generateRandomCode()
            const bookingInfor = {
                bookingTrip: currentTrip,
                bookingUser: userInfor,
                bookedSeat: selectedSeats,
                pickPoint: pickLocation,
                dropPoint: dropLocation
            }
            dispatch(bookingActions.saveInfor(bookingInfor))
            navigate(`/payment/${bookingCode}`)
        }
    }

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {message.message!=='' && <Message message={message.message} messagetype={message.messagetype} />}
            <div>
                <Navbar></Navbar>
                <Header type="list" />
                <div className={styles.trip_container}>
                    <div className={styles.trip_wrapper}>
                        <div className={styles.trip_infor}>
                            <div className={styles.infor_segment}>
                                <h2>Chọn ghế</h2>
                                <SeatMap seatMap={currentTrip.bus.busType.seatMap} booked={currentTrip.bookedSeat} selectedSeats={selectedSeats} handleSeatClick={handleSeatClick}></SeatMap>
                            </div>
                            <div className={styles.infor_segment}>
                                <h2>Thông tin đón trả</h2>
                                <div className={styles.pick_area}>
                                    <PickLocation pick={true} listLocation={listPick.current} setLocation={handlePickLocation} selected={pickLocation}></PickLocation>
                                    <PickLocation pick={false} listLocation={listDrop.current} setLocation={handleDropLocation} selected={dropLocation}></PickLocation>
                                </div>
                            </div>
                            <div className={styles.infor_segment}>
                                <div className={styles.user_infor_container}>
                                    <form className={`${styles.infor_box} ${styles.personal_infor}`} ref={inforForm}>
                                        <h2>Thông tin khách hàng</h2>
                                        {userInput.map((input) => (
                                            <FormInput  key={input.id} {...input} 
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
                                <span>{`Tổng cộng: ${(currentTrip.ticketPrice*selectedSeats.length).toLocaleString()} đ`}</span>
                                <Button text="Thanh toán" 
                                        className={styles.btnCheckout}
                                        onClick={handlePayment}>
                                </Button>
                            </div>
                        </div>
                        <div className={styles.trip_sum}>
                            <h3 className={styles.sum_title}>Thông tin lượt đi</h3>
                            <div className={styles.sum_infor}>
                                <span className={styles.sum_infor_title}>Chuyến xe</span>
                                <span className={styles.sum_infor_value}>{`${currentTrip.startStation.name} ⇒ ${currentTrip.endStation.name}`}</span>
                            </div>
                            <div className={styles.sum_infor}>
                                <span className={styles.sum_infor_title}>Thời gian</span>
                                <span className={styles.sum_infor_value}>{`${convertToTime(currentTrip.departTime)} ${currentTrip.departDate}`}</span>
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
                                <span className={styles.sum_infor_value}>{`${(currentTrip.ticketPrice*selectedSeats.length).toLocaleString()} đ`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Trip
