import React from 'react';

const ImgDialog = props => {
  const {img, alt, removeCropped} = props;
    return (
    <>
      <img src={img} alt={alt} className='w-100 p-1' />
        <button className='border-0 rounded position-absolute w-100 h-100 removeImgBtn' onClick={removeCropped}>Crop Again</button>
    </>)
}
export default ImgDialog;