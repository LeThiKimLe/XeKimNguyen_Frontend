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

    const [file, setFile] = useState()
    const handleUpImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setValueInfor({ ...valueInfor, img: e.target.files[0] })
        setUpdated(true)
    }

    const [isUpdating, setIsUpdating] = useState(false)

    const [valueInfor, setValueInfor] = useState(
        user ? ({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === "true" ?
                GENDER_OPTION[0] :
                GENDER_OPTION[1]),
            idCard: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.idCard
                    : user.user.driver.idCard)
                : ('12345678909')),
            address: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.address
                    : user.user.driver.address)
                : ('123 Phan Boi Chau')),
            beginWorkDate: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.beginWorkDate
                    : user.user.driver.beginWorkDate)
                : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.img
                    : user.user.driver.img)
                : (user.user.customer.img)),
        }) :
            (
                {
                    tel: '', name: '',
                    email: '', gender: GENDER_OPTION[0],
                    idCard: '', address: '',
                    beginWorkDate: '',
                    licenseNumber: '',
                    issueDate: '',
                    img: ''
                }
            )
    )

    const handleResetInfor = (e) => {
        e.preventDefault()
        setValueInfor({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === "true" ?
                GENDER_OPTION[0] :
                GENDER_OPTION[1]),
            idCard: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.idCard
                    : user.user.driver.idCard)
                : ('12345678909')),
            address: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.address
                    : user.user.driver.address)
                : ('123 Phan Boi Chau')),
            beginWorkDate: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.beginWorkDate
                    : user.user.driver.beginWorkDate)
                : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img: (userRole > 1 ?
                (userRole < 4 ? user.user.staff.img
                    : user.user.driver.img)
                : (user.user.customer.img)),
        })
        setIsUpdating(false)
        setFile(null)
        setUpdated(false)
    }

    const userInfor = UPDATE_INFOR

    const onChangeInfor = (e) => {
        if (updated === false)
            setUpdated(true)
        setValueInfor({ ...valueInfor, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (isUpdating) {
            if (updated == true)
            {
                dispatch(authThunk.updateProfile({ updatedInfor: valueInfor }))
                    .unwrap()
                    .then(() => {
                        setIsUpdating(false)
                    })
                    .catch((error) => {
                        console.log('fail')
                    })
            }
            else
            {
                setIsUpdating(false)
                setUpdated(false)
            }
        }
        else {
            setIsUpdating(true)
        }
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
                                            <Container fluid>
                                                <Row>
                                                    <Col md={4}>
                                                        <div className={styles.userIcon}>
                                                            <img src={file ? file 
                                                                            : (valueInfor.img ? valueInfor.img 
                                                                                              : valueInfor.gender.value === 1 ? female 
                                                                                                                              : male)} alt="User ICon" />
                                                            { isUpdating &&
                                                                <input type="file" onChange={handleUpImage} name='myImage' style={{width: '100%'}}></input>}
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <form action="" className={styles.inforForm} onSubmit={handleUpdate}>
                                                            {userInfor.filter((infor) => infor.role.includes(userRole))
                                                                .map((infor) => (
                                                                    <FormInput key={infor.id} {...infor}
                                                                        value={valueInfor[infor.name]}
                                                                        onChange={onChangeInfor}
                                                                        readOnly={isUpdating === false ? true : infor.editable.includes(userRole)}
                                                                    >
                                                                    </FormInput>
                                                                )
                                                                )
                                                            }
                                                            <div className={styles.btnGroup}>
                                                            <Button text={isUpdating ? "Lưu thông tin" : "Cập nhật"}
                                                                className={styles.updateBtn}
                                                                loading={loading}
                                                            >
                                                            </Button>
                                                            {isUpdating && 
                                                           <OptionButton text='Hủy' onClick={handleResetInfor}  className={styles.updateBtn}></OptionButton>}
                                                            </div>
                                                        </form>
                                                        
                                                    </Col>
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