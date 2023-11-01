import styles from './styles.module.css'

const ChangeTicket = () => {
    const [process, setProcess] = useState(1)

    const handleConfirmPolicy = () => {
        if (confirm)
            setProcess(2)
        else
            setError(true)
    }

    return (
        <div>
            {process === 1 && (
                <div className={styles.container}>
                    <h2 style={{ textAlign: 'center' }}>Chính sách đổi vé</h2>
                    <h3><b style={{ fontSize: '18px' }}>* Điều kiện đổi vé</b></h3>
                    <p>
                        <b><i>+ Đối với vé ngày thường: </i></b>
                        <span>Khách hàng đã đặt vé với số lượng và thông báo hủy vé trước 24 tiếng trước giờ khởi hành
                            sẽ được hỗ trợ đổi vé 1 lần. </span>
                        <br />
                        <b><i>+ Đối với vé lễ: </i></b>
                        <span>KHÔNG hỗ trợ đổi vé lễ hoặc đổi vé thường sang vé lễ</span>
                        <br />
                        <b>
                            <FontAwesomeIcon icon={faCircleExclamation} color='red' />
                            <i>Chỉ hỗ trợ đổi vé một lần duy nhất</i>
                        </b>
                    </p>
                    <div className={styles.infor_confirm}>
                        <input
                            style={{ transform: 'scale(2)', marginRight: '10px' }}
                            type="checkbox"
                            checked={confirm}
                            onChange={() => setConfirm(!confirm)}
                        />
                        <label style={{ fontWeight: '600' }}>Tôi đồng ý với chính sách đổi vé của Xe Kim Nguyên</label>
                        <br />
                        {error && <i style={{ color: 'red' }}>Vui lòng xác nhận đồng ý với chính sách đổi vé</i>}
                    </div>
                    <Button text='Tiếp tục' onClick={handleConfirmPolicy} className={styles.nextBtn}></Button>
                </div>
            )
            }
        </div>
    )
}

export default ChangeTicket