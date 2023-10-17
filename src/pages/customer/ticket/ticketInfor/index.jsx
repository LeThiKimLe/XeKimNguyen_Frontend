import styles from './styles.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faPause, faCircleDown, faCopy } from '@fortawesome/free-solid-svg-icons'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import clipboardCopy from 'clipboard-copy'
import { selectMessage, selectError } from '../../../../feature/ticket/ticket.slice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { ticketAction } from '../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'
import Message from '../../../../components/message'

const TicketInfor = ({booking}) => {

    const message = useSelector(selectMessage)
    const error = useSelector(selectError)
    const dispatch = useDispatch()
    const downloadQR = (code) => {
        const qrCodeContainer = document.getElementById(code);
        html2canvas(qrCodeContainer).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
        });
    }

    const copyBillCode = (content) => {
        clipboardCopy(content)
        .then(() => {
            dispatch(ticketAction.setMessage({message: 'Đã copy mã hóa đơn', error: false}))
            
        })
        .catch(() => {
            dispatch(ticketAction.setMessage({message: 'Lỗi xảy ra', error: true}))
            // dispatch(ticketAction.reset())
        })
        dispatch(ticketAction.reset())
    }

    return (
        <div className={styles.container}>
            {message !== '' && <Message message={message} messagetype={error===true ? 2 : 1} />}
            <div className={styles.status} 
                style={{backgroundColor: booking.status === 'success' ? '#6AE5D3' :
                         (booking.status === 'pending' ? '#FBEEAC' :'FF8080')}}>
                {booking.status === 'success' && (<FontAwesomeIcon icon={faCheck} color='#ffffff' />) }
                {booking.status === 'pending' && (<FontAwesomeIcon icon={faXmark} color='#ffffff' />) }
                {booking.status === 'cancel' && (<FontAwesomeIcon icon={faPause} color='#ffffff' />) }
            </div>
            <div className={styles.message}>{booking.message}</div>
            <div className={styles.inforForm}>
                <div className={styles.formTitle}> Thông tin mua vé </div>
                <Container fluid>
                    <Row className='justify-content-center gutter'>
                        <Col lg={6} md={12} className={`d-flex justify-content-center ${styles.infor}`}>
                            <div style={{minWidth:'300px'}}>
                                <div className={styles.detailInfor}>
                                    <span>Họ và tên:</span>
                                    <span>{booking.user.name}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                    <span>Số điện thoại:</span>
                                    <span>{booking.user.tel}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                    <span>Email:</span>
                                    <span>{booking.user.email}</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12} className={`d-flex justify-content-center ${styles.infor}`}>
                            <div style={{minWidth:'300px'}}>
                                <div className={styles.detailInfor}>
                                        <span>Tổng giá vé:</span>
                                        <span>{`${(booking.ticketNumber * booking.trip.ticketPrice).toLocaleString()}đ`}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                        <span>PT thanh toán:</span>
                                        <span>{booking.transaction.paymentMethod}</span>
                                </div>
                                <div className={styles.detailInfor}>
                                        <span>Trạng thái:</span>
                                        <span>{booking.transaction.status}</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='justify-content-center gutter'>
                        {booking.tickets.map((ticket) => (
                            <Col lg={4} md={4} xs={12} className={styles.ticketContainer} key={ticket.code}>
                                <div className={styles.ticketCode}>{`Mã vé: ${ticket.code}`}</div>
                                <div className={styles.qrCode} id={ticket.code}>
                                <QRCode
                                        value={ticket.code}
                                        size={100}
                                        level={'H'}
                                    />
                                </div>
                                <p style={{marginTop:'0'}}>
                                    <FontAwesomeIcon icon={faCircleDown}/>
                                    <a onClick={()=>downloadQR(ticket.code)} className={styles.downloadQR}>
                                        Tải vé
                                    </a>
                                </p>
                                <div className={styles.ticketInfor}>
                                    <div className={styles.ticketDetail}>
                                        <span>Mã đặt vé</span>
                                        <span>{booking.code}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Tuyến xe</span>
                                        <span>{`${booking.route.departure.name} - ${booking.route.destination.name}`}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Thời gian</span>
                                        <span>{`${booking.trip.departTime} - ${booking.trip.departDate}`}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Số ghế</span>
                                        <span>{ticket.seat}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Điểm lên xe</span>
                                        <span>{booking.pickPoint.name}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Giá vé</span>
                                        <span>{`${booking.trip.ticketPrice.toLocaleString()}đ`}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Biển số xe</span>
                                        <span>{booking.bus.licensePlate}</span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Mã hóa đơn</span>
                                        <span>
                                            <FontAwesomeIcon icon={faCopy} onClick={() => copyBillCode(ticket.billCode)} color='#504e4e' className={styles.copyBtn} />
                                            {` ${ticket.billCode}`}
                                        </span>
                                    </div>
                                    <div className={styles.ticketDetail}>
                                        <span>Kiểm tra hóa đơn</span>
                                        <span><a href="/bill" target='_blank'>Tại đây</a></span>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default TicketInfor