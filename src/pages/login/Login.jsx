import './login.css'
import FormInput from '../../components/common/formInput/FormInput'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import loginImg from '../../assets/login-img.png'
import { useState, useEffect, useRef } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AuthService from '../../service/auth.service'
// import { withRouter } from '../../common/with-router'
import Message from "../../components/message/Message";
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/button/Button'

const Login = () => 
{
    const [message, setMessage] = useState({message: '', messagetype: 0})

    const [valuesLogin, setValuesLogin] = useState({
        username:"",
        password:""
    })

    const [selectedTab, setSelectedTab] = useState(0);

    const navigate = useNavigate();

    const formLogin = useRef(null);
    const formSignup = useRef(null);

    const [valuesSignup, setValuesSignup] = useState({
        telnum:"",
        password:"",
        repass:"",
        name:"",
        email:"",
        otp:"",
        process: 0
    })

    const inputLogin = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Số điện thoại",
            errorMessage:"Sai số điện thoại",
            label: "Số điện thoại",
            pattern: "^0[0-9]{9,10}$",
            required: true,
            lastItem: false
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Mật khẩu",
            errorMessage:"Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu",
            pattern: "^.{6,}$",
            required: true,
            lastItem: true
        },
    ]

    const inputSignup =[
        {
            id: 1,
            name: "telnum",
            type: "text",
            placeholder: "Số điện thoại",
            errorMessage:"Sai số điện thoại",
            label: "Số điện thoại",
            pattern: "^0[0-9]{9,10}$",
            required: true,
            lastItem: false
        },
        {
            id: 2,
            name: "name",
            type: "text",
            placeholder: "Họ và tên",
            errorMessage:"Tên không quá 30 ký tự",
            label: "Họ và tên",
            pattern: "^.{1,30}$",
            required: true,
            lastItem: false
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage:"",
            label: "Email",
            required: true,
            lastItem: false
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Mật khẩu",
            errorMessage:"Mật khẩu có ít nhất 6 ký tự",
            label: "Mật khẩu",
            pattern: "^.{6,}$",
            required: true,
            lastItem: true
        },
        {
            id: 5,
            name: "repass",
            type: "password",
            placeholder: "Nhập lại mật khẩu",
            errorMessage:"Mật khẩu không khớp",
            label: "Nhập lại mật khẩu",
            pattern: valuesSignup.password,
            required: true,
            lastItem: false
        },
        {
            id: 6,
            name: "otp",
            type: "text",
            placeholder: "OTP",
            errorMessage:"Mã OTP có 6 ký tự",
            label: "Nhập mã OTP",
            pattern: "^[0-9]{6}$",
            required: true,
            lastItem: false
        }
    ]
    
    const handleLogin = async (e) => {
        // e.preventDefault();
        if (formLogin.current.checkValidity())
        {
            navigate('/', {state: {valuesLogin}});
        // AuthService.login(valuesLogin.username, valuesLogin.password)
        //             .then(
        //                 ()=>{
        //                     this.props.router.navigate('/')
        //                     window.location.reload()
        //                 },
        //                 error => {
        //                     const resMessage = (
        //                         error.response && 
        //                         error.response.data &&
        //                         error.response.data.message) || error.message
        //                         error.toString()
        //                     setMessage(resMessage)
        //                     }
        //             )
        }
        else{
            formLogin.current.reportValidity();
        }
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

    const onChangeLogin = (e)=>{
        setValuesLogin({...valuesLogin, [e.target.name]: e.target.value})
    }

    const onChangeSignup = (e)=>{
        setValuesSignup({...valuesSignup, [e.target.name]: e.target.value})
    }

    const handleGetOTP = () =>{
        setValuesSignup({...valuesSignup, process: 1})
    }

    const handleValidateOTP = () =>{
        setValuesSignup({...valuesSignup, process: 2})
    }

    const handleSignUp = (e) => {
        // e.preventDefault();
        setMessage({message:'Đăng ký thành công. Hãy đăng nhập lại', messagetype:1})
        cancelSignup()
        setSelectedTab(0)
        // AuthService.register(valuesSignup.telnum, valuesSignup.name, 
        //                     valuesSignup.email,valuesLogin.password)
        //             .then(
        //                 ()=>{
        //                     this.props.router.navigate('/')
        //                     window.location.reload()
        //                 },
        //                 error => {
        //                     const resMessage = (
        //                         error.response && 
        //                         error.response.data &&
        //                         error.response.data.message) || error.message
        //                         error.toString()
        //                     setMessage(resMessage)
        //                     }
        //             )
    }

    const cancelSignup = () => {
        setValuesSignup({telnum:"",
                        password:"",
                        repass:"",
                        name:"",
                        email:"",
                        otp:"",
                        process: 0}
                        );
    }

    return (
        <>
        {message.message!=='' && <Message message={message.message} messagetype={message.messagetype} />}
        <div>
            <Navbar></Navbar>
            <Header type="list" />
            <div className="container">
                <div className="loginContainer">
                    <div className="loginImg">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="formContainer">
                        <Tabs className="Tabs"  selectedIndex={selectedTab} onSelect={index => setSelectedTab(index)}>
                            <TabList>
                                <Tab onClick={cancelSignup}>Đăng nhập</Tab>
                                <Tab>Đăng ký</Tab>
                            </TabList>
                            <TabPanel>

                                    <form action="" ref={formLogin}>
                                        {inputLogin.map((input) => (
                                            <FormInput key={input.id} {...input} value={valuesLogin[input.name]} onChange={onChangeLogin} ></FormInput>  
                                        ))}
                                        <Button className='btnLogin' text="Đăng nhập" asyncFunction={handleLogin}></Button>
                                    </form>
                            </TabPanel>
                            <TabPanel>
                                
                                {valuesSignup.process===0 && (
                                    <form action="" onSubmit={handleGetOTP} ref={formSignup}>
                                        <FormInput key={inputSignup[0].id} {...inputSignup[0]} value={valuesSignup.telnum} onChange={onChangeSignup}></FormInput>
                                        <Button className='btnLogin' text="Nhận mã OTP"></Button>
                                    </form>
                                )}
                                {valuesSignup.process===1 && (
                                    <form action="" onSubmit={handleValidateOTP}>
                                        <FormInput key={inputSignup[5].id} {...inputSignup[5]} value={valuesSignup.otp} onChange={onChangeSignup}></FormInput>
                                        <Button className='btnLogin' text="Xác thực mã OTP"></Button>
                                    </form>
                                )}
                                {valuesSignup.process===2 && (
                                    <form action="" onSubmit={handleSignUp}>
                                        {inputSignup.slice(1,5).map((input) => (
                                            <FormInput key={input.id} {...input} value={valuesSignup[input.name]} onChange={onChangeSignup} ></FormInput>  
                                        ))}
                                        <Button className='btnLogin' text="Hoàn tất đăng ký"></Button>
                                    </form>
                                )}
    
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
        </>
    )
}

export default Login
