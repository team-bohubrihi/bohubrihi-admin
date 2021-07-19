import React, {useState, useCallback} from 'react';
import {Col, Button, Spinner, Input, Tooltip} from 'reactstrap';
import Cropper from 'react-easy-crop';
import {getCroppedImg} from '../../../../../../utils/helpers';
import imageCompression from 'browser-image-compression';
import ImgDialog from './ImgDialog';

const ImgPreview = ({img, comImg, minWidth, finalImg, loading, setLoading, btnTrigger, label, alt, aspect, modifyImg, info}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [ttOpen, setTtOpen] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels), []);

  const showCroppedImage = useCallback(async () => {
    try {
      setLoading(true);
      const croppedImg = await getCroppedImg(img, croppedAreaPixels);
      const file = await imageCompression.getFilefromDataUrl(croppedImg, Date.now()+'.jpg');

      const compressedImg = await imageCompression(file, { 
        maxSizeMB: 1,
        maxWidthOrHeight: minWidth
      });

      const compressedDataUrl = await imageCompression.getDataUrlFromFile(compressedImg);

      setLoading(false);
      finalImg(compressedDataUrl);
    } catch (e) {
      console.error(e)
    }
  }, [finalImg, loading, croppedAreaPixels]);

  let renderable = <button onClick={btnTrigger} className='py-5 rounded w-100 bg-white dashedBtn'>
    <Tooltip isOpen={ttOpen} target={'img'+minWidth} toggle={()=>setTtOpen(!ttOpen)}>{info}</Tooltip>
    {label}
  </button>;

  if(img){
    renderable = (<>
      {comImg ? <ImgDialog removeCropped={() => finalImg(null)} img={comImg} alt={alt} /> : <>
        <div className="position-relative w-100 cropContainer">
          <Cropper
            classes={{containerClassName: 'rounded-top'}}
            image={img}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div className='p-2 bg-white rounded-bottom'>
          <Input type='range' className='mb-1' min={1} max={3} step={.1} value={zoom} onChange={e=>setZoom(e.target.value)}/>

          <Button color='success' onClick={showCroppedImage}>Crop</Button>
          <Button color='info' onClick={()=>modifyImg(null)} className='ml-2'>Remove Image</Button>
        </div>
      </>}
    </>)
  }

  renderable = loading ? (<div className='position-absolute middle'>
    <Spinner color='light'/>
  </div>) : renderable;

  return <Col className='my-1 px-1 position-relative rounded singleCourseImg' xl='4' lg='4' md='6' sm='6' xs='12'>
    <div id={'img'+minWidth}>
      {renderable}
    </div>
  </Col>
}
export default ImgPreview;