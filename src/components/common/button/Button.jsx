import './button.css'
import { ClipLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

const Button = ({text, asyncFunction}) => {

    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        if (asyncFunction){
            setLoading(true);
            await asyncFunction()
            setLoading(false);
        }
      };

    return (
        <button className='prime-btn' onClick={handleButtonClick}>
            {loading ? (
                <>
                <ClipLoader color="#ffffff" size={15} />
                <span>{text}</span>
                </>
            ) : (
                text
            )}
        </button>
    )
}

export default Button