import React, {useState, useRef} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row} from 'reactstrap';
import ImgPreview from './ImgPreview';
import AlertMsg from '../utils/AlertMsg';
import imageCompression from 'browser-image-compression';
import {isAcceptableImg} from '../utils/helpers';

const ImgSelectModal = props => {
    const {modalOpen, toggleModal, compressedImgs, courseImgFinalize} = props;
    const {Header, Title, Body} = Modal;

    const [selectImgs, setSelectImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });

    const [imgLoading, setImgLoading] = useState({
        bgImg: false,
        listThumb: false,
        viewedThumb: false
    });

    const imgLoadingSetting = (name, val) => setImgLoading({...imgLoading, [name]: val});
    const courseImgInit = (name, img) => setSelectImgs({...selectImgs, [name]: img});

    const bgImgRef = useRef();
    const listThumbRef = useRef();
    const viewedThumbRef = useRef();

    const triggerBgImgRef = () => bgImgRef.current.click();
    const triggerListThumbRef = () => listThumbRef.current.click();
    const triggerViewedThumbRef = () => viewedThumbRef.current.click();


    const handleImg = async(e, minWidth, minHeight) => {
        const name = e.target.name;
        imgLoadingSetting(name, true);
        const imgUrl = await imageCompression.getDataUrlFromFile(e.target.files[0]);
        const img = await imageCompression.loadImage(imgUrl);
        const isAcceptable = isAcceptableImg(img, minWidth, minHeight);
        isAcceptable ? courseImgInit(name, imgUrl) : dispatch(toggleAlert(true));
        imgLoadingSetting(name, false);
        e.target.value=null;
    }

    return (
    <Modal dialogClassName='mw-100 m-0' onHide={()=>toggleModal(!modalOpen)} show={modalOpen} animation={false}>
        <Header closeButton className='py-2 px-1 bg-secondary text-white'>
            <Title>Add Course Images</Title>
        </Header>

        <Body className='p-2 bg-info border border-secondary border-top-0 CourseImgWrap'>
            <AlertMsg type='danger' msg="Image is smallar than it's required size!"/>
            <Row className='mw-100 m-auto'>
                <ImgPreview
                    alt='Background Image'
                    btnTrigger={triggerBgImgRef}
                    label='Select Background Image'
                    img={selectImgs.bgImg}
                    comImg={compressedImgs.bgImg}
                    loading={imgLoading.bgImg}
                    setLoading={val=>imgLoadingSetting('bgImg', val)}
                    modifyImg={val=>courseImgInit('bgImg', val)}
                    finalImg={val=>courseImgFinalize('bgImg', val)}
                    aspect={40/21}
                    minWidth={1200}
                />

                <ImgPreview
                    alt='List Thumbnail'
                    btnTrigger={triggerListThumbRef}
                    label='Select List Thumbnail'
                    img={selectImgs.listThumb}
                    comImg={compressedImgs.listThumb}
                    loading={imgLoading.listThumb}
                    setLoading={val=>imgLoadingSetting('listThumb', val)}
                    modifyImg={val=>courseImgInit('listThumb', val)}
                    finalImg={val=>courseImgFinalize('listThumb', val)}
                    aspect={4/3}
                    minWidth={300}
                />

                <ImgPreview
                    alt='Viewed Thumbnail'
                    btnTrigger={triggerViewedThumbRef}
                    label='Select Viewed Thumbnail'
                    img={selectImgs.viewedThumb}
                    comImg={compressedImgs.viewedThumb}
                    loading={imgLoading.viewedThumb}
                    setLoading={val=>imgLoadingSetting('viewedThumb', val)}
                    modifyImg={val=>courseImgInit('viewedThumb', val)}
                    finalImg={val=>courseImgFinalize('viewedThumb', val)}
                    aspect={66/37}
                    minWidth={660}
                />
            </Row>

            <input
                ref={bgImgRef}
                onChange={e=>handleImg(e, 1200, 630)}
                className='d-none'
                type='file'
                name='bgImg'
            />

            <input
                ref={listThumbRef}
                onChange={e=>handleImg(e, 300, 225)}
                className='d-none'
                type='file'
                name='listThumb'
            />

            <input
                ref={viewedThumbRef}
                onChange={e=>handleImg(e, 660, 370)}
                className='d-none'
                type='file'
                name='viewedThumb'
            />
        </Body>
    </Modal>)
}
export default ImgSelectModal;