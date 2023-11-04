import styles from './styles.module.css'
import Header from '../../../components/header'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import { Container, Col, Row } from 'react-bootstrap'
import momo from '../../../assets/momo.svg'
import vnpay from '../../../assets/vnpay.svg'
import icon_scan from '../../../assets/icon_scan.svg'
import { useSelector } from 'react-redux'
import { selectBookingInfor } from '../../../feature/booking/booking.slice'
import { useState } from 'react'
import { convertToTime } from '../../../utils/unitUtils'
import QRCode from 'react-qr-code'
import CountDown from './CountDown'
import Button from '../../../components/common/button'

const Payment = () => {

    const [payment, setPayment] = useState('momo')
    const handleChooseMethod = (e) => {
        setPayment(e.target.value)
    }
    const bookingInfor = useSelector(selectBookingInfor)
    console.log(bookingInfor)
    return (
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Container fluid>
                        <Row>
                            <Col lg={8} className={styles.paymentContainer}>
                                <Row>
                                    <Col lg={5} md={5} className={styles.methodCol}>
                                        <h3 className={styles.colTitle}>Chọn hình thức thanh toán</h3>
                                        <div className={styles.methods}>
                                            <label style={{ margin: '15px 0' }}>
                                                <input
                                                    type="radio"
                                                    value="momo"
                                                    checked={payment === 'momo'}
                                                    onChange={handleChooseMethod}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <img src={momo} alt="" style={{ marginRight: '10px' }} />
                                                <b>MoMo</b>
                                            </label>
                                            <br></br>
                                            <label style={{ margin: '15px 0' }}>
                                                <input
                                                    type="radio"
                                                    value="vnpay"
                                                    checked={payment === 'vnpay'}
                                                    onChange={handleChooseMethod}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <img src={vnpay} alt="" style={{ marginRight: '10px' }} />
                                                <b>VNPay</b>
                                            </label>
                                        </div>
                                    </Col>

                                    <Col lg={7} md={7} className={styles.qrCol}>
                                        <h4 className={styles.colTitle}>Tổng thanh toán</h4>
                                        <h2>{`${(bookingInfor.bookingTrip.ticketPrice * bookingInfor.bookedSeat.length).toLocaleString()} đ`}</h2>
                                        <i style={{ color: 'red', fontSize: '14px' }}>{`Thời gian giữ chỗ còn lại `}
                                         <CountDown></CountDown>
                                        </i>
                                        <div className={styles.qr}>
                                            <QRCode
                                                value={payment}
                                                size={200}
                                                level={'H'}
                                            />
                                        </div>
                                        <div className={styles.direction}>
                                            <h4>Hướng dẫn thanh toán</h4>
                                            <ol>
                                                <li>Mở ứng dụng tương ứng trên điện thoại</li>
                                                <li>Dùng biểu tượng
                                                    <img src={icon_scan} alt="" />
                                                    để quét mã QR
                                                </li>
                                                <li>Quét mã tại trang và thực hiện các bước
                                                    xác nhận thanh toán ở ứng dụng</li>
                                            </ol>
                                        </div>
                                        <Button text='Thanh toán'></Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <div className={styles.trip_sum}>
                                    <h3 className={styles.sum_title}>Thông tin hành khách</h3>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Họ tên: </span>
                                        <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.name}</span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Số điện thoại: </span>
                                        <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.tel}</span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Email: </span>
                                        <span className={styles.sum_infor_value}>{bookingInfor.bookingUser.email}</span>
                                    </div>
                                </div>
                                <div className={styles.trip_sum}>
                                    <h3 className={styles.sum_title}>Thông tin lượt đi</h3>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Chuyến xe</span>
                                        <span className={styles.sum_infor_value}>
                                            {bookingInfor.bookingTrip.tripInfor.turn === true ? 
                                            `${bookingInfor.bookingTrip.tripInfor.startStation.name} ⇒ ${bookingInfor.bookingTrip.tripInfor.endStation.name}`
                                            : `${bookingInfor.bookingTrip.tripInfor.endStation.name} ⇒ ${bookingInfor.bookingTrip.tripInfor.startStation.name}`}
                                        </span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Thời gian</span>
                                        <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingTrip.departTime).slice(0,-3)} ${bookingInfor.bookingTrip.departDate}`}</span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Số lượng ghế</span>
                                        <span className={styles.sum_infor_value}>{`${bookingInfor.bookedSeat.length} ghế`}</span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Vị trí ghế</span>
                                        <span className={styles.sum_infor_value}>{bookingInfor.bookedSeat.join(', ')}</span>
                                    </div>
                                    <div className={styles.sum_infor}>
                                        <span className={styles.sum_infor_title}>Tổng tiền</span>
                                        <span className={styles.sum_infor_value}>{`${(bookingInfor.bookingTrip.ticketPrice * bookingInfor.bookedSeat.length).toLocaleString()} đ`}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Payment