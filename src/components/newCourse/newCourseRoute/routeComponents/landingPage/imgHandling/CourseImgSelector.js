import React from 'react';
import {Row, Col} from 'reactstrap';

const CourseImgSelector = ({imgs, openModal}) => {
    const {bgImg, listThumb, viewedThumb} = imgs;

    const imgBox = (src, label) => (
        <Col xl='4' lg='4' md='4' sm='12' xs='12' className='p-1 py-md-0'>
            {src ? <img className='img-fluid border border-dark rounded' src={src} /> : <strong>{label}</strong>}
        </Col>
    );

    return(<div className='d-block cPointer text-center py-3 mb-3 rounded dashedBtn' onClick={openModal} >
        {!bgImg && !listThumb && !viewedThumb ? <strong>Select Course Images</strong> : (<Row className='mw-100 m-0'>
            {imgBox(bgImg, 'Select Background Image')}
            {imgBox(listThumb, 'Select List Image')}
            {imgBox(viewedThumb, 'Select Course Thumbnail')}
        </Row>)}
    </div>)
}
export default CourseImgSelector;