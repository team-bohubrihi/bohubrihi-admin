import React from 'react';

const ImgDialog = ({img, alt, removeCropped}) => (<>
    <img src={img} alt={alt} className='w-100 rounded' />
    <button className='btn btn-dark border-white rounded-circle position-absolute removeImgBtn transition' onClick={removeCropped}>X</button>
  </>);
export default ImgDialog;