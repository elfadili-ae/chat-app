import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div className='spinner'>
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="rgb(185, 84, 101)"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Spinner