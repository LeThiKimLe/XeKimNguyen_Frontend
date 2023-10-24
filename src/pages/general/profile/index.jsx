import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUserRoleId, selectUser, selectLoading, selectMessage, selectError } from '../../../feature/auth/auth.slice'
import { PROFILE_ACTION, GENDER_OPTION, UPDATE_INFOR } from '../../../utils/constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from 'react'
import male from '../../../assets/male.svg'
import female from '../../../assets/female.svg'
import FormInput from '../../../components/common/formInput'
import Button, { OptionButton } from '../../../components/common/button'
import { useNavigate } from 'react-router-dom'
import { selectActive } from '../../../feature/profile/profile.slice'
import { profileAction } from '../../../feature/profile/profile.slice'
import { useDispatch } from 'react-redux'
import Message from '../../../components/message'
import authThunk from '../../../feature/auth/auth.service'
import { authActions } from '../../../feature/auth/auth.slice'
import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import ProfileInfor from './ProfileInfor'

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const actionList = PROFILE_ACTION
    const userRole = useSelector(selectUserRoleId)
    const user = useSelector(selectUser)
    const active = useSelector(selectActive)
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)
    const [updated, setUpdated] = useState(false)

    const handleAction = (action) => {
        dispatch(profileAction.setActive({ active: action.index }))
        navigate(`/profile/${action.name}`)
    }

    
    useEffect(() => {
        return () => {
            dispatch(authActions.reset());
        };
    }, []);

    useEffect(() => {
        if (message !== '') {
            const timer = setTimeout(() => {
                dispatch(authActions.reset());
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [message])

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date('2023/01/01'),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openDate, setOpenDate] = useState(false)


    return (
        <div>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} />}
            <Navbar></Navbar>
            <Header type="list" />
            <div className={styles.profile_container}>
                <div className={styles.profile_wrapper}>
                    <Container fluid>
                        <Row lg={12} md={12} xs={12}>
                            <Col lg={3} className={`d-none d-lg-block ${styles.navBar}`}>
                                {actionList.filter((action) => action.roles.includes(userRole)).map(
                                    (action) => (
                                        <div className={`${styles.navItem} ${action.index === active ? styles.active : ''}`}
                                            onClick={() => handleAction(action)}
                                            key={action.index}>
                                            <FontAwesomeIcon icon={action.icon} width="20px" height="20px" />
                                            <span>{action.title}</span>
                                        </div>
                                    ))
                                }
                            </Col>
                            <Col lg={9} md={12} className={styles.navContent}>
                                <div className={styles.actionTitle}>
                                    <h1>{actionList[active - 1].title}</h1>
                                    <h3>{actionList[active - 1].subDescription}</h3>
                                </div>
                                <div className={styles.actionContent}>
                                    {
                                        actionList[active - 1].name === 'account-infor' && (
                                            <ProfileInfor></ProfileInfor>
                                        )
                                    }
                                    {actionList[active - 1].name === 'ticket-history' && (
                                        <Container fluid>
                                            <Row>
                                                <Col>
                                                    <p>Mã vé</p>
                                                    <input type="text" placeholder='Mã vé' />
                                                </Col>
                                                <Col>

                                                    <p>Thời gian</p>
                                                    <input  type="text" 
                                                            value={`${format(dateRange[0].startDate, 'dd/MM/yyyy')} - ${format(dateRange[0].endDate, 'dd/MM/yyyy')}`} 
                                                            onClick={()=> setOpenDate(!openDate)}
                                                            readOnly
                                                    />
                                                    {
                                                        openDate && 
                                                        <DateRange
                                                            editableDateInputs={true}
                                                            onChange={item => setDateRange([item.selection])}
                                                            moveRangeOnFirstSelection={false}
                                                            ranges={dateRange}
                                                        />
                                                    }

                                                </Col>
                                                <Col>
                                                    <p>Trạng thái</p>
                                                </Col>
                                                <Col>
                                                    <OptionButton text='Tìm'></OptionButton>
                                                </Col>
                                            </Row>
                                            <Row>

                                            </Row>
                                        </Container>
                                    )
                                    }
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
export default Profile