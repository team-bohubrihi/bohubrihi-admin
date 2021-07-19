import React, {useState, useRef} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Row} from 'reactstrap';
import ImgPreview from './ImgPreview';
import imageCompression from 'browser-image-compression';
import {isAcceptableImg} from '../../../../../../utils/helpers';

const ImgSelectModal = ({modalOpen, toggleModal, compressedImgs, courseImgFinalize, toggleAlert}) => {
    const imgs = {bgImg: null, listThumb: null, viewedThumb: null};
    const [selectImgs, setSelectImgs] = useState({...imgs});
    const [imgLoading, setImgLoading] = useState({...imgs});
    const imgLoadingSetting = (name, val) => setImgLoading({...imgLoading, [name]: val});
    const courseImgInit = (name, img) => setSelectImgs({...selectImgs, [name]: img});

    const refs = [useRef(), useRef(), useRef()];

    const handleImg = async(data, minWidth, minHeight) => {
        const name = data.name;
        imgLoadingSetting(name, true);
        const imgUrl = await imageCompression.getDataUrlFromFile(data.files[0]);
        const img = await imageCompression.loadImage(imgUrl);
        isAcceptableImg(img, minWidth, minHeight) ? courseImgInit(name, imgUrl) : toggleAlert();
        imgLoadingSetting(name, false);
        data.value=null;
    }

    const previewImg = (alt, i, label, img, ratio, mw, info) =>(<ImgPreview
        alt={alt}
        btnTrigger={()=>refs[i].current.click()}
        label={label}
        img={selectImgs[img]}
        comImg={compressedImgs[img]}
        loading={imgLoading[img]}
        setLoading={val=>imgLoadingSetting(img, val)}
        modifyImg={val=>courseImgInit(img, val)}
        finalImg={val=>courseImgFinalize(img, val)}
        aspect={ratio}
        minWidth={mw}
        info={info}
    />);

    const inputField = (i, width, height, name) => (<input
        ref={refs[i]}
        onChange={e=>handleImg(e.target, width, height)}
        className='d-none'
        type='file'
        name={name}
    />);

    return (<Modal className='maxElementWidth m-0 mx-auto p-1' fade={false} isOpen={modalOpen}>
        <ModalHeader toggle={()=>toggleModal(!modalOpen)} className='p-3 bg-secondary text-white'>
            Add Course Images
        </ModalHeader>

        <ModalBody className='p-2 bg-info border border-secondary border-top-0 CourseImgWrap'>
            <Row className='mw-100 m-auto'>
                {previewImg('Background Image', 0, 'Select Background Image', 'bgImg', 40/21, 1200, 'This\'ll be shown as a background image while users\'ll view this course. Minimum required size is 1200*630.')}

                {previewImg('List Thumbnail', 1, 'Select List Thumbnail', 'listThumb', 4/3, 300, 'This\'ll be shown while users\'ll browse course list. Minimum required size is 300*225.')}

                {previewImg('Viewed Thumbnail', 2, 'Select Viewed Thumbnail', 'viewedThumb', 66/37, 660, 'This\'ll be shown with course details. Minimum required size is 660*370')}
            </Row>

            {inputField(0, 1200, 630, 'bgImg')}
            {inputField(1, 300, 225, 'listThumb')}
            {inputField(2, 660, 370, 'viewedThumb')}
        </ModalBody>
    </Modal>)
}
export default ImgSelectModal;