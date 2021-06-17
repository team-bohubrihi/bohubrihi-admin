import React, {useState, useCallback} from 'react';
import {Col, Button} from 'reactstrap';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import {getCroppedImg} from '../utils/helpers';
import ImgDialog from './ImgDialog';

const ImgPreview = props => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels), []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(props.img, croppedAreaPixels);
      props.finalImg(croppedImg);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e)
    }
  }, [props, croppedAreaPixels]);

  let renderable = props.loading ? <h3>Loading...</h3> : <button onClick={props.btnTrigger} className='py-5 rounded w-100 bg-white dashedBtn'>{props.label}</button>;

  if(props.img){
    renderable = (<>
      {croppedImage ? <ImgDialog removeCropped={() => {
        props.finalImg(null);
        setCroppedImage(null);
      }} img={croppedImage} alt={props.alt} /> : <>
      <div className="position-relative w-100 cropContainer">
        <Cropper
          classes={{containerClassName: 'rounded'}}
          image={props.img}
          crop={crop}
          zoom={zoom}
          aspect={7 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className='p-2'>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e, zoom) => setZoom(zoom)}
        />

        <Button color='success' onClick={showCroppedImage}>Crop</Button>
        <Button color='info' onClick={()=>props.modifyImg(null)} className='ml-2'>Remove Image</Button>
      </div></>}
    </>)
  }

  return <Col className='my-1' xl='4' lg='4' md='6' sm='12' xs='12'>
    <div className='position-relative bg-secondary rounded singleCourseImg'>
      {renderable}
    </div>
  </Col>
}
export default ImgPreview;