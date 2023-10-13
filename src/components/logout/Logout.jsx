import styles from './logout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { OptionButton } from '../common/button';
import { useRef, useEffect } from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  const acceptBtn = useRef(null)

  useEffect(() => {
    acceptBtn.current.focus();
  }, []);

  return (
    <div className={styles.logout_confirmation}>
      <div className={styles.logout_mask} onClick={onCancel}></div>
      <div className={styles.logout_dialog}>
        <div className={styles.logout_title}>
          <FontAwesomeIcon icon={faCircleExclamation} color='#febb02' size='2x' />
          <span>Bạn thực sự muốn đăng xuất?</span>
        </div>
        <div className={styles.logout_actions}>
          <OptionButton onClick={onCancel} text="Hủy"></OptionButton>
          <OptionButton onClick={onConfirm} text="Xác nhận" ref={acceptBtn}></OptionButton>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;