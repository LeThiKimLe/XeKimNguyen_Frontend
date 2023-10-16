import styles from './styles.module.css'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUserRoleId, selectUser, selectLoading, selectMessage, selectError } from '../../../feature/auth/auth.slice'
import { PROFILE_ACTION, GENDER_OPTION, UPDATE_INFOR } from '../../../utils/constants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState} from 'react'
import male from '../../../assets/male.svg'
import female from '../../../assets/female.svg'
import FormInput from '../../../components/common/formInput'
import Button from '../../../components/common/button'
import { useNavigate } from 'react-router-dom'
import { selectActive } from '../../../feature/profile/profile.slice'
import { profileAction } from '../../../feature/profile/profile.slice'
import { useDispatch } from 'react-redux'
import Message from '../../../components/message'
import { ClipLoader } from 'react-spinners'
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
    
    const handleAction = (action) => {
        dispatch(profileAction.setActive({active: action.index}))
        navigate(`/profile/${action.name}`)
    }

    const [file, setFile] = useState()
    const handleUpImage = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const [isUpdating, setIsUpdating] = useState(false)

    const [valueInfor, setValueInfor] = useState(
        user ? ({
            tel: user.user.tel,
            name: user.user.name,
            email: user.user.email,
            gender: (user.user.gender === true ? 
                     GENDER_OPTION[0]:
                    GENDER_OPTION[1]),
            idCard: ( userRole > 1 ? 
                    ( userRole < 4 ? user.user.staff.idCard 
                                   : user.user.driver.idCard)
                    : ('12345678909')),
            address: ( userRole > 1 ? 
                    ( userRole < 4 ? user.user.staff.address
                                   : user.user.driver.address)
                    : ('123 Phan Boi Chau')),
            beginWorkDate: ( userRole > 1 ? 
                            ( userRole < 4 ? user.user.staff.beginWorkDate
                                        : user.user.driver.beginWorkDate)
                            : ('09-09-2023')),
            licenseNumber: (userRole < 4 ? '' : user.user.driver.licenseNumber),
            issueDate: (userRole < 4 ? '' : user.user.driver.issueDate),
            img:  ( userRole > 1 ? 
                ( userRole < 4 ? user.user.staff.img
                               : user.user.driver.img)
                : ('https://cdn-icons-png.flaticon.com/512/6386/6386976.png')),
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

    const userInfor = UPDATE_INFOR

    const onChangeInfor = (e) => {
        setValueInfor({ ...valueInfor, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (isUpdating)
        {
            dispatch(authThunk.updateProfile({updatedInfor: valueInfor}))
            .unwrap()
            .then(() => {
                setIsUpdating(false)
                dispatch(authActions.reset());
            })
            .catch((error) => {
                console.log('fail')
            })
        }
        else
        {
            setIsUpdating(true)
        }
    }

    console.log('message' + message)

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
                                        <div className={`${styles.navItem} ${action.index === active ? styles.active:''}`} 
                                            onClick={()=>handleAction(action)}
                                            key= {action.index}>
                                            <FontAwesomeIcon icon={action.icon} width="20px" height="20px"/>
                                            <span>{action.title}</span>
                                        </div>
                                    ))
                                }
                            </Col>
                            <Col lg={9} md={12} className={styles.navContent}>
                                <div className={styles.actionTitle}>
                                    <h1>{actionList[active-1].title}</h1>
                                    <h3>{actionList[active-1].subDescription}</h3>
                                </div>
                                <div className={styles.actionContent}>
                                    {
                                        actionList[active-1].name==='account-infor' && (
                                            <Container fluid>
                                                <Row>
                                                    <Col md={4}>
                                                        <div className={styles.userIcon}>
                                                            <img src={file? file : (valueInfor.gender.value === 1 ? female : male)} alt="User ICon" />
                                                            <input type="file" onChange={handleUpImage}></input>
                                                        </div>
                                                    </Col>
                                                    <Col md={8}>
                                                        <form action="" className={styles.inforForm} onSubmit={handleUpdate}>
                                                            {userInfor.filter((infor) => infor.role.includes(userRole))
                                                            .map((infor) => (
                                                                <FormInput key = {infor.id} {...infor} 
                                                                           value = {valueInfor[infor.name]} 
                                                                           onChange = {onChangeInfor}
                                                                           readOnly = {isUpdating === false ? true : infor.editable.includes(userRole)}
                                                                           >
                                                                </FormInput>
                                                            )
                                                            )}
                                                            <Button text={isUpdating ? "Lưu thông tin" : "Cập nhật"}
                                                                    className={styles.updateBtn}
                                                                    loading= {loading}
                                                            >
                                                            </Button>
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