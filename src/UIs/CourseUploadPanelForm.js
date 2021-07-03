import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';

import FeautresBox from './FeaturesBox';
import CourseImgSelector from './CourseImgSelector';
import ImgSelectModal from './ImgSelectModal';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {useDispatch, useSelector} from 'react-redux';
import {createCourseDraft, updateCourseData, loadCategories, loadFeatures, addCourseFeature, toggleAlert} from '../redux/actionCreators';

import '../css/courseUploadPanelForm.css';

const CourseUploadPanelForm = () => {
    const {courseId, categories, features} = useSelector(({courseManage})=>({
        courseId: courseManage.newCourseId,
        categories: courseManage.categories,
        features: courseManage.courseFeatures,
    }));
    const dispatch = useDispatch();
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

    const [compressedImgs, setCompressedImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });
    const courseImgFinalize = (name, img) => setCompressedImgs({...compressedImgs, [name]: img});

    const toolbarClasses = 'mb-0 p-2 border-0 rounded-top bg-primary toolbar';
    const editorClasses = 'bg-light rounded-bottom px-2 py-0 mt-0 editor';
    const lblClasses = 'text-white px-0 py-1';
    const inputClasses = 'bg-transparent border-0 text-white whitePlaceholder resetInputStyle';

    const mapCategories = [];
    if(categories){
        for(let cat in categories)mapCategories.push(<option key={cat} value={cat}>{categories[cat]['name']}</option>);
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
                <Input placeholder='Enter Course Title' name='title' onChange={e=>changeCourseData(e)} className={inputClasses} type='text' autoComplete='off' />
            </FormGroup>

            <FormGroup className='mb-4'>
                <Label className={lblClasses}>Subtitle</Label>
                <Input placeholder='Enter Course Subtitle' name='subtitle' onChange={e=>changeCourseData(e)} className={inputClasses} type='text' autoComplete='off' />
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
                    <Input onFocus={()=> !categories ? dispatch(loadCategories()) : null} className='text-white border-0 whitePlaceholder' name='cat' onChange={e=>changeCourseData(e)} type='select'>
                        <option>--Category--</option>
                        {categories ? mapCategories : <option>Loading...</option>}
                    </Input>
                </Col>
            </FormGroup>

            <FormGroup className='mb-4'>
                <FeautresBox
                    loadFeatures={()=>dispatch(loadFeatures())}
                    features={features}
                    uploadFeature={data=>dispatch(addCourseFeature(data))}
                    selectFeature={changeCourseData}
                    showAlert={()=>dispatch(toggleAlert(true))}
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

            <CourseImgSelector openModal={()=>setModalOpen(true)} imgs={compressedImgs}/>

            <ImgSelectModal modalOpen={modalOpen} toggleModal={setModalOpen} compressedImgs={compressedImgs} courseImgFinalize={courseImgFinalize}/>

            <Button type='submit'>Publish</Button>
        </Form>
    </Container>)
}
export default CourseUploadPanelForm;