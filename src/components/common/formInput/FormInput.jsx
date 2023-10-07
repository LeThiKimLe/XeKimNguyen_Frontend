import "./formInput.css"
import {useState} from 'react'

const FormInput = (props) => {
    const [focused, setFocused] = useState(false)
    const {label, errorMessage, onChange, id, lastItem, required, ...inputProps } = props;
    const handleFocus = (e) => {
        setFocused(true)
    }
    return (
        <div className="formInput">
            <label className="inputLabel"> 
                {label} 
                <span className="input-required"> {required? '*':''} </span>
            </label>
            <div className="inputContain">
            <input {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                focused={focused.toString()}
                // onFocus={()=> lastItem===true && setFocused(true)}
                className="inputInput"/>
            <span className="inputError">{errorMessage}</span>
            </div>
        </div>
    )
}

export default FormInput