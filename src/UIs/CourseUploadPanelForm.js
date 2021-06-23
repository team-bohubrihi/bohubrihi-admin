import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';

import ImgPreview from './ImgPreview';
import FeautresBox from './FeaturesBox';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../css/courseUploadPanelForm.css';

import imageCompression from 'browser-image-compression';

import {isAcceptableImg} from '../utils/helpers';

import {useDispatch, useSelector} from 'react-redux';
import {createCourseDraft, updateCourseData, loadCategories, loadFeatures, addCourseFeature, toggleAlert} from '../redux/actionCreators';

const CourseUploadPanelForm = () => {
    const {courseId, categories, features} = useSelector(state=>({
        courseId: state.courseManage.newCourseId,
        categories: state.courseManage.categories,
        features: state.courseManage.courseFeatures,
    }));
    const dispatch = useDispatch();
    useEffect(()=>{if(!categories)dispatch(loadCategories())}, [categories]);
    const [modalOpen, setModalOpen] = useState(false);

    //temporary Btn state
    const [newCourse, setNewCourse] = useState(false);

    const [courseData, setCourseData] = useState({
        title: '',
        subtitle: '',
        duration: '',
        price: '',
        discount: '',
        language: '',
        features: [],
        desc: EditorState.createEmpty(),
        syllabusDesc: EditorState.createEmpty(),
        difficulty: '',
        cat: ''
    });

    const changeCourseData = (data, name='desc', feature=null) => {
        const target = data.target;
        let value = data;

        if(target && !feature){
            name = target.name;
            value = target.value;
            if((target.type==='number' && value<0) || (name==='discount' && value>100))return;
        }
        if(feature){
            value = [...courseData.features];
            target.checked ? value = [...value, feature] : value.splice(value.indexOf(feature), 1);
        }
        setCourseData({
            ...courseData,
            [name]: value
        });

        dispatch(updateCourseData({
            [name]: target ? value : draftToHtml(convertToRaw(value.getCurrentContent()))
        }, courseId));
    }

    const [selectImgs, setSelectImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });
    const [compressedImgs, setCompressedImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });
    const [imgLoading, setImgLoading] = useState({
        bgImg: false,
        listThumb: false,
        viewedThumb: false
    });

    const bgImgRef = useRef();
    const listThumbRef = useRef();
    const viewedThumbRef = useRef();

    const triggerBgImgRef = () => bgImgRef.current.click();
    const triggerListThumbRef = () => listThumbRef.current.click();
    const triggerViewedThumbRef = () => viewedThumbRef.current.click();

    const courseImgInit = (name, img) => setSelectImgs({...selectImgs, [name]: img});
    const courseImgFinalize = (name, img) => setCompressedImgs({...compressedImgs, [name]: img});

    const toolbarClasses = 'mb-0 p-2 border-0 rounded-top bg-primary toolbar';
    const editorClasses = 'bg-light rounded-bottom px-2 py-0 mt-0 editor';
    const lblClasses = 'text-white px-0 py-1';
    const inputClasses = 'bg-transparent border-0 text-white whitePlaceholder resetInputStyle';

    const mapCategories = [];
    if(categories){
        for(let cat in categories)mapCategories.push(<option key={cat} value={cat}>{categories[cat]['name']}</option>);
    }

    const handleImg = async(e) => {
        const name = e.target.name;
        setImgLoading({...imgLoading, [name]: true});
        const imgUrl = await imageCompression.getDataUrlFromFile(e.target.files[0]);
        const img = await imageCompression.loadImage(imgUrl);
        const isAcceptable = isAcceptableImg(img, 1000, 500);
        dispatch(toggleAlert(true));
        courseImgInit(name, imgUrl);
        setImgLoading({...imgLoading, [name]: false});
        e.target.value=null;
    }

    const handleCourse = e => {
        e.preventDefault();
    }

   if(!newCourse)return <Button onClick={()=>{dispatch(createCourseDraft());setNewCourse(true)}}>New Course</Button>;

    return (
    <Container className='p-1 px-md-3'>
        <Form onSubmit={e=>handleCourse(e)} className='my-3 px-1 px-md-4 py-3 rounded border courseDataFrm'>
            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Course Title</Label>
                <Input placeholder='Enter Course Title' name='title' onChange={e=>changeCourseData(e)} className={inputClasses} type='text' />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Subtitle</Label>
                <Input placeholder='Enter Course Subtitle' name='subtitle' onChange={e=>changeCourseData(e)} className={inputClasses} type='text' />
            </FormGroup>

            <FormGroup className='p-0 mx-auto mw-100' row>
                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='duration' onChange={e=>changeCourseData(e)} placeholder='Course Duration' value={courseData.duration} type='number' />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='price' onChange={e=>changeCourseData(e)} placeholder='Price' value={courseData.price} type='number' />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='discount' onChange={e=>changeCourseData(e)} placeholder='Discount(%)' type='number'  value={courseData.discount} />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='language' onChange={e=>changeCourseData(e)} type='select'>
                        <option>--Language--</option>
                        <option>Bangla</option>
                        <option>English</option>
                    </Input>
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='difficulty' onChange={e=>changeCourseData(e)} type='select'>
                        <option>--Difficulty--</option>
                        <option>Basic</option>
                        <option>Intermidiate</option>
                        <option>Advance</option>
                        <option>Basic to Intermidiate</option>
                        <option>Basic to Advance</option>
                    </Input>
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white border-0 whitePlaceholder' name='cat' onChange={e=>changeCourseData(e)} type='select'>
                        <option>--Category--</option>
                        {mapCategories}
                    </Input>
                </Col>
            </FormGroup>

            <FormGroup className='mb-4'>
                <FeautresBox
                    loadFeatures={()=>dispatch(loadFeatures())}
                    features={features}
                    uploadFeature={data=>dispatch(addCourseFeature(data))}
                    selectFeature={changeCourseData}
                />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Course Description</Label>

                <Editor
                    editorState={courseData.desc}
                    onEditorStateChange={changeCourseData}
                    wrapperClassName='p-0'
                    toolbarClassName={toolbarClasses}
                    editorClassName={editorClasses}
                />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Syllabus Description(Optional)</Label>

                <Editor
                    editorState={courseData.syllabusDesc}
                    onEditorStateChange={state=>changeCourseData(state, 'syllabusDesc')}
                    wrapperClassName='p-0'
                    toolbarClassName={toolbarClasses}
                    editorClassName={editorClasses}
                />
            </FormGroup>

            <button className='d-block w-100 py-5 mb-3 rounded dashedBtn' onClick={()=>setModalOpen(!modalOpen)} >Select Course Images</button>

            <Modal dialogClassName='mw-100 m-0' onHide={()=>setModalOpen(!modalOpen)} show={modalOpen} animation={false}>
                <ModalHeader tag='h3' className='py-2 bg-secondary text-white'>
                    Add Course Images
                </ModalHeader>

                <ModalBody className='p-2 bg-info CourseImgWrap'>
                    <Row>
                        <ImgPreview
                            alt='Background Image'
                            btnTrigger={triggerBgImgRef}
                            label='Select Background Image'
                            img={selectImgs.bgImg}
                            loading={imgLoading.bgImg}
                            modifyImg={val=>courseImgInit('bgImg', val)}
                            finalImg={val=>courseImgFinalize('bgImg', val)}
                            aspect={40/21}
                        />

                        <ImgPreview
                            alt='List Thumbnail'
                            btnTrigger={triggerListThumbRef}
                            label='Select List Thumbnail'
                            img={selectImgs.listThumb}
                            loading={imgLoading.listThumb}
                            modifyImg={val=>courseImgInit('listThumb', val)}
                            finalImg={val=>courseImgFinalize('listThumb', val)}
                            aspect={4/3}
                        />

                        <ImgPreview
                            alt='Viewed Thumbnail'
                            btnTrigger={triggerViewedThumbRef}
                            label='Select Viewed Thumbnail'
                            img={selectImgs.viewedThumb}
                            loading={imgLoading.viewedThumb}
                            modifyImg={val=>courseImgInit('viewedThumb', val)}
                            finalImg={val=>courseImgFinalize('viewedThumb', val)}
                            aspect={66/37}
                        />
                    </Row>
                </ModalBody>

                <ModalFooter className='py-2 bg-secondary'>
                    <Button color='info' onClick={()=>setModalOpen(!modalOpen)}>OK</Button>
                </ModalFooter>
            </Modal>

            <input
                ref={bgImgRef}
                onChange={e=>handleImg(e)}
                className='d-none'
                type='file'
                name='bgImg'
            />
            <input
                ref={listThumbRef}
                onChange={e=>handleImg(e)}
                className='d-none'
                type='file'
                name='listThumb'
            />
            <input
                ref={viewedThumbRef}
                onChange={e=>handleImg(e)}
                className='d-none'
                type='file'
                name='viewedThumb'
            />

            <Button type='submit'>Publish</Button>
        </Form>
    </Container>)
}
export default CourseUploadPanelForm;