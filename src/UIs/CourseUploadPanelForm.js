import React, { useState, useRef } from 'react';
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

const CourseUploadPanelForm = props => {
    const [courseDesc, setCourseDesc] = useState(EditorState.createEmpty());
    const [syllabusDesc, setSyllabusDesc] = useState(EditorState.createEmpty());
    const [modalOpen, setModalOpen] = useState(false);

    const [initialCourseImgs, setInitialCourseImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });

    const [finalCourseImgs, setFinalCourseImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });

    console.log(finalCourseImgs)

    const [courseImgLoading, setCourseImgLoading] = useState({
        bgImg: false,
        listThumb: false,
        viewedThumb: false
    });

    const bgImgRef = useRef();
    const triggerBgImgRef = () => bgImgRef.current.click();

    const listThumbRef = useRef();
    const triggerListThumbRef = () => listThumbRef.current.click();

    const viewedThumbRef = useRef();
    const triggerViewedThumbRef = () => viewedThumbRef.current.click();

    const toolbarClasses = 'mb-0 p-2 border-0 rounded-0 rounded-top bg-transparent toolbar';
    const editorClasses = 'border border-top-0 border-dark rounded-bottom px-2 py-0 mt-0 editor';

    const lblClasses = 'text-white px-0 py-1';
    const inputClasses = 'bg-transparent border-0 text-white whitePlaceholder resetInputStyle';

    const courseImgInit = (name, img) => setInitialCourseImgs({...initialCourseImgs, [name]: img});

    const courseImgFinalize = (name, img) => setFinalCourseImgs({...finalCourseImgs, [name]: img});

    const handleImg = async(e) => {
        const name = e.target.name;
        setCourseImgLoading({...courseImgLoading, [name]: true});
        const imgUrl = await imageCompression.getDataUrlFromFile(e.target.files[0]);
        courseImgInit(name, imgUrl);
        setCourseImgLoading({...courseImgLoading, [name]: false});
        e.target.value=null;
    }

    const handleCourse = e => {
        e.preventDefault();
    }

    return (
    <Container className='p-1 px-md-3'>
        <Form onSubmit={e=>handleCourse(e)} className='my-3 px-1 px-md-4 py-3 rounded border courseDataFrm'>
            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Course Title</Label>
                <Input placeholder='Enter Course Title' className={inputClasses} type='text' />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Subtitle</Label>
                <Input placeholder='Enter Course Subtitle' className={inputClasses} type='text' />
            </FormGroup>

            <FormGroup className='p-0 mx-auto mw-100' row>
                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' placeholder='Course Duration' type='number' />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' placeholder='Price' type='number' />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' placeholder='Discount(%)' type='number' min={0} max={100} />
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' type='select'>
                        <option>--Language--</option>
                        <option>Bangla</option>
                        <option>English</option>
                    </Input>
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' type='select'>
                        <option>--Difficulty--</option>
                        <option>Basic</option>
                        <option>Intermidiate</option>
                        <option>Advance</option>
                        <option>Basic to Intermidiate</option>
                        <option>Basic to Advance</option>
                    </Input>
                </Col>

                <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                    <Input className='text-white whitePlaceholder' type='select'>
                        <option>--Category--</option>
                        <option>Programming</option>
                        <option>Lifestyle</option>
                        <option>Arts &amp; Drawing</option>
                        <option>Mental Health</option>
                        <option>Corporate</option>
                    </Input>
                </Col>
            </FormGroup>

            <FormGroup className='mb-4'>
                <FeautresBox/>
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Course Description</Label>

                <Editor
                    editorState={courseDesc}
                    onEditorStateChange={setCourseDesc}
                    wrapperClassName='p-0'
                    toolbarClassName={toolbarClasses}
                    editorClassName={editorClasses}
                />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Syllabus Description(Optional)</Label>

                <Editor
                    editorState={syllabusDesc}
                    onEditorStateChange={setSyllabusDesc}
                    wrapperClassName='p-0'
                    toolbarClassName={toolbarClasses}
                    editorClassName={editorClasses}
                />
            </FormGroup>

            <Button onClick={()=>setModalOpen(!modalOpen)} color='primary'>Select Course Images</Button>

            <Modal dialogClassName='mw-100 m-0' onHide={()=>setModalOpen(!modalOpen)} show={modalOpen}>
                <ModalHeader tag='h3' className='py-2 bg-secondary text-white'>
                    Add Course Images
                </ModalHeader>

                <ModalBody className='p-2 bg-info CourseImgWrap'>
                    <Row>
                        <ImgPreview
                            alt='Background Image'
                            btnTrigger={triggerBgImgRef}
                            label='Select Background Image'
                            img={initialCourseImgs.bgImg}
                            loading={courseImgLoading.bgImg}
                            modifyImg={val=>courseImgInit('bgImg', val)}
                            finalImg={val=>courseImgFinalize('bgImg', val)}
                        />

                        <ImgPreview
                            alt='List Thumbnail'
                            btnTrigger={triggerListThumbRef}
                            label='Select List Thumbnail'
                            img={initialCourseImgs.listThumb}
                            loading={courseImgLoading.listThumb}
                            modifyImg={val=>courseImgInit('listThumb', val)}
                            finalImg={val=>courseImgFinalize('listThumb', val)}
                        />

                        <ImgPreview
                            alt='Viewed Thumbnail'
                            btnTrigger={triggerViewedThumbRef}
                            label='Select Viewed Thumbnail'
                            img={initialCourseImgs.viewedThumb}
                            loading={courseImgLoading.viewedThumb}
                            modifyImg={val=>courseImgInit('viewedThumb', val)}
                            finalImg={val=>courseImgFinalize('viewedThumb', val)}
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

            <Button type='submit'>Submit</Button>
        </Form>
    </Container>)
}
export default CourseUploadPanelForm;