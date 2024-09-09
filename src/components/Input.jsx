import React from 'react'
import Attach from '../images/attachment.png'

const Input = () => {
    return (
        <div className='input'>
            <input type='text' placeholder='Say something...' />
            <div className='actions'>
                <input type='file' id='file' style={{ display: 'none' }} />
                <label htmlFor='file'>
                    <img src={Attach} alt='attach file' />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input