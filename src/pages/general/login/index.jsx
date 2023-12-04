import styles from './styles.module.css'
import './login.css'
import FormInput from '../../../components/common/formInput'
import Navbar from '../../../components/navbar'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import loginImg from '../../../assets/login-img.png'
import { useState, useEffect, useRef } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Message from "../../../components/message"
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/common/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoading, selectMessage, selectError } from '../../../feature/auth/auth.slice'
import { authActions } from '../../../feature/auth/auth.slice'
import authThunk from '../../../feature/auth/auth.service'
import { ClipLoader } from 'react-spinners';
import { useMediaQuery } from 'react-responsive'

const Login = () => {

    const uniqueKey = Date.now();
    const message = useSelector(selectMessage)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const [valuesLogin, setValuesLogin] = useState({
        username: "",
        password: ""
    })

    const [selectedTab, setSelectedTab] = useState(0);

    const navigate = useNavigate()

    const formLogin = useRef(null)
    const formSignup = useRef(null)
    const formGetOTP = useRef(null)
    const formValidOTP = useRef(null)

    const [valuesSignup, setValuesSignup] = useState({
        telnum: "",
        password: "",
        repass: "",
        name: "",
        email: "",
        otp: "",
        process: 0
    })

    const inputLogin = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Số điện thoại",
            errorMessage: "Sai số điện thoại",
            label: "Số điện thoại",
            // pattern: "^0[0-9]{9,10}$",
            required: true
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Mật khẩu",
            errorMessage: "Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu",
            pattern: "^.{6,}$",
            required: true
        },
    ]

    const inputSignup = [
        {
            id: 1,
            name: "telnum",
            type: "text",
            placeholder: "Số điện thoại",
            errorMessage: "Sai số điện thoại",
            label: "Số điện thoại",
            pattern: "^0[0-9]{9,10}$",
            required: true,

        },
        {
            id: 2,
            name: "name",
            type: "text",
            placeholder: "Họ và tên",
            errorMessage: "Tên không quá 30 ký tự",
            label: "Họ và tên",
            pattern: "^.{1,30}$",
            required: true,

        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "",
            label: "Email",
            required: true,

        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Mật khẩu",
            errorMessage: "Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu",
            pattern: "^.{6,}$",
            required: true,

        },
        {
            id: 5,
            name: "repass",
            type: "password",
            placeholder: "Nhập lại mật khẩu",
            errorMessage: "Mật khẩu không khớp",
            label: "Nhập lại mật khẩu",
            pattern: valuesSignup.password,
            required: true,
        },
        {
            id: 6,
            name: "otp",
            type: "text",
            placeholder: "OTP",
            errorMessage: "Mã OTP có 6 ký tự",
            label: "Nhập mã OTP",
            pattern: "^[0-9]{6}$",
            required: true,
        }
    ]

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authThunk.login({ username: valuesLogin.username, password: valuesLogin.password }))
            .unwrap()
            .then(() => {
                dispatch(authActions.reset());
                navigate('/')
            })
            .catch((error) => {
                console.log('fail')
            })
    }

    useEffect(() => {
        const signUpInfor = localStorage.getItem('signUpInfor')
        if (signUpInfor) {
            setValuesSignup(JSON.parse(signUpInfor));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('signUpInfor', JSON.stringify(valuesSignup));
    }, [valuesSignup]);

    const onChangeLogin = (e) => {
        setValuesLogin({ ...valuesLogin, [e.target.name]: e.target.value })
    }

    const onChangeSignup = (e) => {
        setValuesSignup({ ...valuesSignup, [e.target.name]: e.target.value })
    }

    const handleGetOTP = (e) => {
        e.preventDefault();
        // dispatch(authThunk.getOTP(valuesSignup.telnum))
        //     .unwrap()
        //     .then(() => {
        //         setValuesSignup({ ...valuesSignup, process: 1 })
        //         dispatch(authActions.reset())
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        setValuesSignup({ ...valuesSignup, process: 1 })
    }

    const handleValidateOTP = (e) => {
        e.preventDefault();
        // dispatch(authThunk.validateOTP(valuesSignup.telnum, valuesSignup.otp))
        //     .unwrap()
        //     .then(() => {
        //         setValuesSignup({ ...valuesSignup, process: 2 })
        //         dispatch(authActions.reset())
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        setValuesSignup({ ...valuesSignup, process: 2 })
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        dispatch(authThunk.register({
            tel: valuesSignup.telnum,
            name: valuesSignup.name,
            email: valuesSignup.email,
            password: valuesSignup.password
        }))
        .unwrap()
            .then(() => {
                cancelSignup()
                setSelectedTab(0)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const cancelSignup = () => {
        setValuesSignup({
            telnum: "",
            password: "",
            repass: "",
            name: "",
            email: "",
            otp: "",
            process: 0
        }
        );
    }

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

    const isBigScreen = useMediaQuery({ query: '(min-width: 1046px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1046px)' })

    return (
        <>
            {message !== '' && <Message message={message} messagetype={error ? 2 : 1} repeat={Date.now()}/>}
            <div>
                <Navbar></Navbar>
                <Header type="list" />
                <div className={styles.container}>
                    <div className={styles.loginContainer}>
                        {isBigScreen &&
                            <div className={styles.loginImg}>
                                <img src={loginImg} alt="" />
                            </div>
                        }
                        <div className='loginTabContainer'>
                            <div className={isBigScreen ? styles.formContainerBig : styles.formContainerSmall}>
                                <Tabs className="Tabs" selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                                    <TabList>
                                        <Tab onClick={cancelSignup}>Đăng nhập</Tab>
                                        <Tab>{` Đăng ký `}</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <form action="" ref={formLogin} onSubmit={handleLogin} className={styles.formInfor}>
                                            {inputLogin.map((input) => (
                                                <FormInput key={input.id} {...input} value={valuesLogin[input.name]} onChange={onChangeLogin}></FormInput>
                                            ))}
                                            <Button text="Đăng nhập" className={styles.btnLogin} ></Button>
                                            <div className={styles.subLink}> <i> Chưa có tài khoản ? </i> <a href="#" onClick={()=> setSelectedTab(1)}> Đăng ký </a> </div>
                                        </form>

                                        {loading &&
                                            <div className={styles.loading_icon}>
                                                <ClipLoader color="#febb02" size={30} />
                                            </div>
                                        }
                                    </TabPanel>
                                    <TabPanel>
                                        {valuesSignup.process === 0 && (
                                            <form action="" ref={formGetOTP} onSubmit={handleGetOTP}>
                                                <FormInput key={inputSignup[0].id} {...inputSignup[0]} value={valuesSignup.telnum} onChange={onChangeSignup}></FormInput>
                                                <Button text="Nhận mã OTP" className={styles.btnLogin}></Button>
                                                <div className={styles.subLink}> <i> Đã có tài khoản ? </i> <a href="#" onClick={()=> setSelectedTab(0)}> Đăng nhập </a> </div>
                                            </form>
                                        )}
                                        {valuesSignup.process === 1 && (
                                            <form action="" ref={formValidOTP} onSubmit={handleValidateOTP}>
                                                <FormInput key={inputSignup[5].id} {...inputSignup[5]} value={valuesSignup.otp} onChange={onChangeSignup}></FormInput>
                                                <Button text="Xác thực mã OTP" className={styles.btnLogin}></Button>
                                            </form>
                                        )}
                                        {valuesSignup.process === 2 && (
                                            <form action="" ref={formSignup} onSubmit={handleSignUp}>
                                                {inputSignup.slice(1, 5).map((input) => (
                                                    <FormInput key={input.id} {...input} value={valuesSignup[input.name]} onChange={onChangeSignup} ></FormInput>
                                                ))}
                                                <Button text="Hoàn tất đăng ký" className={styles.btnLogin}></Button>
                                            </form>
                                        )}
                                        {loading === true ? (
                                            <div className={styles.loading_icon}>
                                                <ClipLoader color="#febb02" size={30} />
                                            </div>) : null
                                        }
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default Login
