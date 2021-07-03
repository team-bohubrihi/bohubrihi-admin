import React from 'react';
import {Row, Col} from 'reactstrap';

const CourseImgSelector = ({imgs, openModal}) => {
    const {bgImg, listThumb, viewedThumb} = imgs;

    return(<button className='d-block w-100 py-3 mb-3 rounded dashedBtn' onClick={openModal} >
        {!bgImg && !listThumb && !viewedThumb ? <strong>Select Course Images</strong> : (<Row className='mw-100 m-auto'>
            <Col className='px-1'>
                {bgImg ? <img className='img-fluid border border-dark rounded' src={bgImg} /> : <strong>Select Background Image</strong>}
            </Col>

            <Col className='px-1'>
                {listThumb ? <img className='img-fluid border border-dark rounded' src={listThumb} /> : <strong>Select List Image</strong>}
            </Col>

            <Col className='px-1'>
                {viewedThumb ? <img className='img-fluid border border-dark rounded' src={viewedThumb} /> : <strong>Select Course Thumbnail</strong>}
            </Col>
        </Row>)}
    </button>)
}
export default CourseImgSelector;