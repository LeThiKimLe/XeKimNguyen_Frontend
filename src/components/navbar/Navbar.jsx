import {useState, useEffect, useRef} from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Logo from '../../assets/logo10.png';

const Navbar = () => {

    const navigate = useNavigate();
    const [language, setLanguage] = useState({
        'vie':true,
        'eng':false
    })
    const langBtn = useRef(null)

    const goToLogin = () => {
        navigate('/login');
    }

    const {t, i18n} = useTranslation();

    const handleTranslate = () =>{
        if (language.vie===true)
        {
            langBtn.current.textContent= "VIE"
            setLanguage({vie:false, eng:true})
            i18n.changeLanguage("en")
        }
        else{
            langBtn.current.textContent= "ENG"
            setLanguage({vie:true, eng:false})
            i18n.changeLanguage("vi")   
        }
    }

    return (
        <div className="navbar">
            <div className="navContainer">
                <div className='logo'>
                    <img src={Logo} alt="XeKimNguyen" />
                </div>
                <div className="navItems">
                    <button className="navButton langBtn" ref = {langBtn} onClick={handleTranslate}>ENG</button>
                    <button className="navButton" onClick={goToLogin}> {t("header.login/signup")} </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
