import styles from './styles.module.css'
import CancelTicket from './CancelTicket'

const TicketAction = ({ type, close }) => {

    const closeForm = () => {
        close()
    }

    const preventClose = (e) =>{
        e.stopPropagation()
    }

    return (
        <div className={styles.container} onClick={closeForm}>
            <div className={styles.mask}></div>
            <div className={styles.action_dialog} onClick={preventClose}>
                <div className={styles.action_content}>
                    {type === 'cancel' && <CancelTicket></CancelTicket>}  
                </div>
            </div>
        </div>
    )
}

export default TicketAction