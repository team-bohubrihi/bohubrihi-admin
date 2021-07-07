import React, {useState, useEffect} from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';

import FeautresBox from './featuresBox/FeaturesBox';
import CourseImgSelector from './imgHandling/CourseImgSelector';
import ImgSelectModal from './imgHandling/ImgSelectModal';
import Categories from './categories/Categories';

import TextEditor from './editor/TextEditor';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {useDispatch, useSelector} from 'react-redux';
import {createCourseDraft, updateCourseData, loadCategories, loadFeatures, addCourseFeature, toggleAlert} from '../../../../../redux/actionCreators';

import '../../../../../css/courseLandingPage.css';

const CourseLandingPage = () => {
    const {courseData, categories, features} = useSelector(({courseManage})=>({
        courseData: courseManage.newCourse,
        categories: courseManage.categories,
        features: courseManage.courseFeatures,
    }));
    const dispatch = useDispatch();

    // Handles changes of every input
    const update = (e, name='desc', feature=null) => dispatch(updateCourseData(e, courseData.id, name, feature, courseData.features));

    // Handles toggling of ImgSelectModal. It's triggered from CourseImgSelector first
    const [modalOpen, setModalOpen] = useState(false);

    // Creates a course draft in database
    useEffect(()=>!courseData.id ? dispatch(createCourseDraft()) : null, []);

    // Stores final images after cropping
    const [compressedImgs, setCompressedImgs] = useState({
        bgImg: null,
        listThumb: null,
        viewedThumb: null
    });
    const courseImgFinalize = (name, img) => setCompressedImgs({...compressedImgs, [name]: img});

    const lblClasses = 'text-info px-0 py-1';
    const colInputClasses = 'text-white border-0 whitePlaceholder';
    const inputClasses = colInputClasses + ' bg-secondary resetInputStyle';

    return (<div className='courseDataFrm'>
        <FormGroup className='mb-4'>
            <Label className={lblClasses}>Course Title</Label>
            <Input placeholder='Enter Course Title' name='title' onChange={e=>update(e)} className={inputClasses} type='text' autoComplete='off' />
        </FormGroup>

        <FormGroup className='mb-4'>
            <Label className={lblClasses}>Subtitle</Label>
            <Input placeholder='Enter Course Subtitle' name='subtitle' onChange={e=>update(e)} className={inputClasses} type='text' autoComplete='off' />
        </FormGroup>

        <FormGroup className='p-0 mx-0 mw-100' row>
            <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                <Input className={colInputClasses} name='duration' onChange={e=>update(e)} placeholder='Course Duration' value={courseData.duration ?? ''} type='number' />
            </Col>

            <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                <Input className={colInputClasses} name='language' onChange={e=>update(e)} type='select'>
                    <option>--Language--</option>
                    <option>Bangla</option>
                    <option>English</option>
                </Input>
            </Col>

            <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                <Input className={colInputClasses} name='difficulty' onChange={e=>update(e)} type='select'>
                    <option>--Difficulty--</option>
                    <option>Basic</option>
                    <option>Intermidiate</option>
                    <option>Advance</option>
                    <option>Basic to Intermidiate</option>
                    <option>Basic to Advance</option>
                </Input>
            </Col>

            <Col className='p-1 my-1' xl='3' lg='3' md='4' sm='6' xs='12'>
                <Input onFocus={!categories ? ()=> dispatch(loadCategories()) : null} className={colInputClasses} name='cat' onChange={e=>update(e)} type='select'>
                    <Categories cats={categories}/>
                </Input>
            </Col>
        </FormGroup>

        <FormGroup className='mb-4'>
            <FeautresBox
                loadFeatures={()=>dispatch(loadFeatures())}
                features={features}
                uploadFeature={data=>dispatch(addCourseFeature(data))}
                selectFeature={update}
            />
        </FormGroup>

        <FormGroup className='mb-4'>
            <Label className={lblClasses}>Course Description</Label>

            <TextEditor update={data=>update(data, 'desc')} />
        </FormGroup>

        <FormGroup className='mb-4'>
            <Label className={lblClasses}>Syllabus Description(Optional)</Label>

            <TextEditor update={data=>update(data, 'syllabusDesc')} />
        </FormGroup>

        <CourseImgSelector openModal={()=>setModalOpen(true)} imgs={compressedImgs}/>

        <ImgSelectModal
            modalOpen={modalOpen}
            toggleModal={setModalOpen}
            compressedImgs={compressedImgs}
            toggleAlert={()=>dispatch(toggleAlert(true))}
            courseImgFinalize={courseImgFinalize}
        />

    </div>)
}
export default CourseLandingPage;