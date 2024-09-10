import React from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner'

const TailSpinner = () => {
  return (
    <div className='spinner'>
      <TailSpin
        visible={true}
        height="20"
        width="20"
        color="white"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default TailSpinner