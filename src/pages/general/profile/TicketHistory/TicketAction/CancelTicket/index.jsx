import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faCircleCheck  } from '@fortawesome/free-solid-svg-icons'
import Button, { OptionButton } from '../../../../../../components/common/button'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTicket, selectProcess } from '../../../../../../feature/ticket/ticket.slice'
import { useDispatch } from 'react-redux'
import { ticketAction } from '../../../../../../feature/ticket/ticket.slice'

const CancelTicket = ({close}) => {
    const [confirm, setConfirm] = useState(false)
    const process = useSelector(selectProcess)
    const [error, setError] = useState(false)
    const currrentTickets = useSelector(selectCurrentTicket)
    const [listCancel, setListCancel] = useState([])
    const dispatch = useDispatch()
    const handleConfirmPolicy = () => {
        if (confirm)
            dispatch(ticketAction.comeForward())
        else
            setError(true)
    }

    const handleSelectTicket = () => {
        if (listCancel.length !== 0)
            dispatch(ticketAction.comeForward())
        else
            setError(true)
    }

    const handleConfirmCancel = () => {
        dispatch(ticketAction.comeForward())
        // call asynThunk here
        dispatch(ticketAction.finishAction())
    }

    const handleChooseTicket = (e) => {
        if (listCancel.includes(e.target.name)) {
            const newList = listCancel.filter((item) => item !== e.target.name)
            setListCancel(newList)
        }
        else {
            setListCancel([...listCancel, e.target.name])
        }
    }

    const handleCheckAll = () => {
        if (listCancel.length === currrentTickets.tickets.length)
            setListCancel([])
        else
            setListCancel(currrentTickets.tickets.map((ticket) => ticket.seat))

    }

    useEffect(() => {
        if (confirm)
            setError(false)
    }, [confirm])

    useEffect(() => {
        if (error === true) {
            if (listCancel.length !== 0)
                setError(false)
        }
    }, [listCancel])

    return (
        <div style={{ height: '100%' }}>
            {process === 1 && (
                <div className={styles.container}>
                    <h2 style={{ textAlign: 'center' }}>Chính sách hủy vé</h2>
                    <h3><b style={{ fontSize: '18px' }}>* Điều kiện hủy vé</b></h3>
                    <p>
                        <b><i>+ Đối với vé ngày thường: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước điều kiện thời gian như sau: </span>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 1 - 3 vé: trước ít nhất 4 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 4 - 9 vé: trước ít nhất 24 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 10 vé trở lên: trước ít nhất 48 tiếng giờ khởi hành.</i>
                        <br />
                        <span>sẽ được hủy vé và được hoàn 90% giá trị vé.</span>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Trường hợp khách hàng đặt từ 1 - 3 vé thông báo hủy vé trong vòng 4h và ít nhất là 30 phút trước khi khởi hành sẽ được hoàn 70% giá trị vé.</i>
                        <br />
                        <span style={{ fontWeight: '500' }}>* Các trường hợp ngoài các điều kiện trên, khách hàng sẽ không được hỗ trợ hủy vé.</span>
                        <br /><br />
                        <b><i>+ Đối với vé lễ: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước điều kiện thời gian như sau:</span>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 1 - 3 vé: trước ít nhất 24 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 4 - 9 vé: trước ít nhất 48 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{ paddingLeft: '20px' }}>- Từ 10 vé trở lên: trước ít nhất 72 tiếng giờ khởi hành.</i>
                        <br />
                        <span>sẽ được hủy vé và được hoàn 70% giá trị vé</span>
                        <br />
                        <span style={{ fontWeight: '500' }}>* Các trường hợp ngoài các điều kiện trên, khách hàng sẽ không được hỗ trợ hủy vé.</span>
                        <br />
                        <b>
                            <FontAwesomeIcon icon={faCircleExclamation} color='red' />
                            <i> Không áp dụng hủy vé nếu vé đã thay đổi (giờ, ngày khởi hành) trước đó</i>
                        </b>
                    </p>

                    <h3><b style={{ fontSize: '18px' }}>* Phương thức hoàn tiền</b></h3>
                    <p>
                        <span>- Đối với các vé đã thanh toán online khi đặt vé: Tiền hoàn vé sẽ được chuyển về tài khoản đã được
                            khách hàng sử dụng để thanh toán khi mua vé.</span>
                        <br />
                        <span>- Thời gian hoàn tiền là 1-3 ngày từ khi khách hàng gửi yêu cầu hủy vé trên web</span>
                    </p>
                    <div className={styles.infor_confirm}>
                        <input
                            style={{ transform: 'scale(2)', marginRight: '10px' }}
                            type="checkbox"
                            checked={confirm}
                            onChange={() => setConfirm(!confirm)}
                        />
                        <label style={{ fontWeight: '600' }}>Tôi đồng ý với chính sách hủy vé của Xe Kim Nguyên</label>
                        <br />
                        {error && <i style={{ color: 'red' }}>Vui lòng xác nhận đồng ý với chính sách hủy vé</i>}
                    </div>
                    <Button text='Tiếp tục' onClick={handleConfirmPolicy} className={styles.nextBtn}></Button>
                </div>
            )
            }
            {process === 2 &&
                (
                    <div className={styles.container}>
                        <h2 style={{ textAlign: 'center' }}>Hủy vé</h2>
                        <span className={styles.inforTitle}>Chuyến xe: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.trip.route.departure.name} - ${currrentTickets.trip.route.destination.name}`}</span>
                        <br />
                        <span className={styles.inforTitle}>Thời gian khởi hành: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.trip.departTime}h`}</span>
                        <br />
                        <br />
                        <div>
                            <span className={styles.inforTitle}>Chọn vé cần hủy*</span>
                            <br />
                            <label htmlFor="all" style={{ marginTop: '10px' }}>
                                <input type="checkbox"
                                    name='all'
                                    checked={listCancel.length === currrentTickets.tickets.length}
                                    onChange={handleCheckAll}
                                    style={{ margin: '0 10px', width: '20px', height: '20px' }} />
                                <i>Chọn tất cả</i>
                            </label>
                            <br />
                            <div className={styles.ticketContainer}>
                                {currrentTickets.tickets.map((ticket) => (
                                    <div className={styles.ticketCover}>
                                        <div key={ticket.code} className={styles.ticketItem}>
                                            <label htmlFor={ticket.seat}>
                                                <input type="checkbox"
                                                    name={ticket.seat}
                                                    checked={listCancel.includes(ticket.seat)}
                                                    onChange={handleChooseTicket}
                                                    style={{ marginRight: '10px', width: '20px', height: '20px' }}
                                                />
                                                <br />
                                                <span>Ghế: </span>
                                                <b>{ticket.seat}</b>
                                                <br />
                                                <i style={{ fontSize: '13px' }}>Mã ghế: </i>
                                                <i style={{ fontSize: '13px' }}>{ticket.code}</i>

                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <b style={{ fontSize: '14px' }}>Lưu ý: </b>
                            <span style={{ fontSize: '14px' }}>Đối với vé đã được thanh toán, hệ thống sẽ tính toán
                                mức hoàn tiền ứng với các điều khoản trong chính sách hủy vé và gửi yêu cầu hoàn tiền cho kế toán. Tiền hoàn sẽ được chuyển
                                về cho tài khoản đã thanh toán vé trong vòng 3-5 ngày làm việc </span>
                            <br />
                            {error && <i style={{ color: 'red', fontSize: '15px' }}>Vui lòng chọn vé cần hủy</i>}
                            <Button text='Tiếp tục' className={styles.nextBtn} onClick={handleSelectTicket}></Button>
                        </div>
                    </div>
                )}
            {
                process === 3 && (
                    <div className={styles.container}>
                        <h2 style={{ textAlign: 'center' }}>Xác nhận hủy vé</h2>
                        <span className={styles.inforTitle}>Chuyến xe: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.trip.route.departure.name} - ${currrentTickets.trip.route.destination.name}`}</span>
                        <br />
                        <span className={styles.inforTitle}>Thời gian khởi hành: </span>
                        <span className={styles.inforValue}>{`${currrentTickets.trip.departTime}h`}</span>
                        <br />
                        <span className={styles.inforTitle}>Số lượng vé hủy: </span>
                        <span className={styles.inforValue}>{listCancel.length}</span>
                        <br />
                        <span className={styles.inforTitle}>Số ghế: </span>
                        <span className={styles.inforValue}>{listCancel.join()}</span>
                        <br />
                        <span className={styles.inforTitle}>Thời gian hủy vé: </span>
                        <span className={styles.inforValue}>{`${(new Date()).toLocaleDateString()} - ${(new Date()).toLocaleTimeString()}`}</span>
                        <br />
                        <span className={styles.inforTitle}>Số tiền khách hàng đã thanh toán: </span>
                        <span className={styles.inforValue}>0đ</span>
                        <br />
                        <span className={styles.inforTitle}>Số tiền sẽ hoàn lại: </span>
                        <span className={styles.inforValue}>0đ</span>
                        <br />
                        <span className={styles.inforTitle}>Chính sách áp dung: </span>
                        <span className={styles.inforValue}>Hỗ trợ hủy ngay đối với vé chưa thanh toán</span>
                        <br />
                        <Button text='Xác nhận hủy vé' className={styles.nextBtn} onClick={handleConfirmCancel}></Button>
                    </div>
                )
            }
            {
                process === 4 && (
                    <div className={styles.container}>
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <FontAwesomeIcon icon={faCircleCheck} color='green' size={'2x'}/>
                            <span>Vé đã được hủy thành công</span>
                        </div>
                        <OptionButton text='Đóng' className={styles.nextBtn} onClick={close}></OptionButton>
                    </div>
                )
            }
        </div>
    )
}

export default CancelTicket