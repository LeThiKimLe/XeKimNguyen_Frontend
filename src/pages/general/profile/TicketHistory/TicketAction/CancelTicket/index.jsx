import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../../../../components/common/button'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTicket } from '../../../../../../feature/ticket/ticket.slice'

const CancelTicket = () => {
    const [confirm, setConfirm] = useState(false)
    const [process, setProcess] = useState(1)
    const [error, setError] = useState(false)
    const currentBooking = useSelector(selectCurrentTicket)

    const handleNextProcess = () => {
        if (confirm)
            setProcess(2)
        else
            setError(true)
    }

    useEffect(()=> {
        if (confirm)
            setError(false)
    }, [confirm])

    return (
        <div>
            {process === 1 ? (
                <div className={styles.container}>
                    <h2 style={{textAlign:'center'}}>Chính sách hủy vé</h2>
                    <h3><b style={{fontSize:'18px'}}>* Điều kiện hủy vé</b></h3>
                    <p>
                        <b><i>+ Đối với vé ngày thường: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước điều kiện thời gian như sau: </span>
                        <br />
                        <i style={{paddingLeft:'20px'}}>- Từ 1 - 3 vé: trước ít nhất 4 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{paddingLeft: '20px'}}>- Từ 4 - 9 vé: trước ít nhất 24 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{paddingLeft: '20px'}}>- Từ 10 vé trở lên: trước ít nhất 48 tiếng giờ khởi hành.</i>
                        <br />
                        <span>sẽ được hủy vé và được hoàn 90% giá trị vé.</span>
                        <br />
                        <i style={{paddingLeft: '20px'}}>- Trường hợp khách hàng đặt từ 1 - 3 vé thông báo hủy vé trong vòng 4h và ít nhất là 30 phút trước khi khởi hành sẽ được hoàn 70% giá trị vé.</i>
                        <br />
                        <span style={{fontWeight:'500'}}>* Các trường hợp ngoài các điều kiện trên, khách hàng sẽ không được hỗ trợ hủy vé.</span>
                        <br /><br />
                        <b><i>+ Đối với vé lễ: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước điều kiện thời gian như sau:</span>
                        <br />
                        <i style={{paddingLeft:'20px'}}>- Từ 1 - 3 vé: trước ít nhất 24 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{paddingLeft:'20px'}}>- Từ 4 - 9 vé: trước ít nhất 48 tiếng giờ khởi hành.</i>
                        <br />
                        <i style={{paddingLeft:'20px'}}>- Từ 10 vé trở lên: trước ít nhất 72 tiếng giờ khởi hành.</i>
                        <br />
                        <span>sẽ được hủy vé và được hoàn 70% giá trị vé</span>
                        <br />
                        <span style={{fontWeight:'500'}}>* Các trường hợp ngoài các điều kiện trên, khách hàng sẽ không được hỗ trợ hủy vé.</span>
                        <br />
                        <b>
                            <FontAwesomeIcon icon={faCircleExclamation} color='red'/>
                            <i> Không áp dụng hủy vé nếu vé đã thay đổi (giờ, ngày khởi hành) trước đó</i>
                        </b>
                    </p>
                    
                    <h3><b style={{fontSize:'18px'}}>* Phương thức hoàn tiền</b></h3>
                    <p>
                        <span>- Đối với các vé đã thanh toán online khi đặt vé: Tiền hoàn vé sẽ được chuyển về tài khoản đã được
                        khách hàng sử dụng để thanh toán khi mua vé.</span>
                        <br />
                        <span>- Thời gian hoàn tiền là 1-3 ngày từ khi khách hàng gửi yêu cầu hủy vé trên web</span>
                    </p>
                    <div className={styles.infor_confirm}>
                        <input
                            style={{transform:'scale(2)', marginRight: '10px'}}
                            type="checkbox"
                            checked={confirm}
                            onChange={()=>setConfirm(!confirm)}
                        />
                        <label style={{fontWeight:'600'}}>Tôi đồng ý với chính sách hủy vé của Xe Kim Nguyên</label>
                        <br />
                        {error && <i style={{color:'red'}}>Vui lòng xác nhận đồng ý với chính sách hủy vé</i>}
                    </div>
                    <Button text='Tiếp tục' onClick={handleNextProcess} className={styles.nextBtn}></Button>
                </div>
            ) : (
                <div className={styles.container}>
                    {/* <h2 style={{textAlign:'center'}}>Hủy vé</h2>
                    <span>Chuyến xe</span>
                    <span>{currentBooking.trip.destination.}</span> */}

                    
                </div>
            )}
        </div>
    )
}

export default CancelTicket