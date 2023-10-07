import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect } from 'react'
import './message.css'
const Message = ({message, messagetype}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (messagetype==1)
            toast.success(message, {
                autoClose: 3000,
                className: 'toast-message'
            })
            else if (messagetype==3)
                toast.error(message, {
                    autoClose: 3000,
                    className: 'toast-message'
                })
            else
            toast.warning(message, {
                autoClose: 3000,
                className: 'toast-message'
            })
        }, 0);
        return () => clearTimeout(timer)
    },[message])

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default Message