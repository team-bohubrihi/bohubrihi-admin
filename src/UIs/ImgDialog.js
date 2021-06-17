import React from 'react'

const ImgDialog = props => {
    return (
    <>
      <img src={props.img} alt={props.alt} className='w-100 p-1' />
        <button className='px-3 rounded py-2 position-absolute imageSelector w-100 h-100 removeImgBtn' onClick={props.removeCropped}>Crop Again</button>
    </>)
}
export default ImgDialog;