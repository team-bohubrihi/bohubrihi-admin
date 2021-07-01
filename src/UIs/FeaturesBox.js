import React, {useState} from 'react';
import {Spinner, Collapse, Card, CardHeader, CardBody, ListGroup, Button} from 'reactstrap';
import IconBox from './IconBox';
import AddFeature from './AddFeature';
import SingleFeature from './SingleFeature';
import AlertMsg from '../utils/AlertMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

const FeautresBox = ({loadFeatures, features, uploadFeature, selectFeature, showAlert}) => {
    const [isOpen, setIsOpen] = useState([false, false, false]);//toggler for tow collapses and a modal
    const [featuresLoading, setFeaturesLoading] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [featureTxt, setFeatureTxt] = useState('');
    const [iconUploading, setIconUploading] = useState(false);

    //Maping all the features loaded from the server
    const featuresMap = [];
    if(features){
        for(let feat in features){
            const _feat = features[feat];
            featuresMap.push(<SingleFeature
                key={feat}
                id={feat}
                selectFeature={selectFeature}
                icon={<FontAwesomeIcon icon={icons[_feat.icon]}/>}
                name={_feat.name}
            />);
        }
    }

    const toggle = (i, icon=null) => {
        let _isOpen = [...isOpen];
        _isOpen[i] = !_isOpen[i];
        if(icon){//If an icon is selected to upload
            setSelectedIcon(icon);
            _isOpen[i]=false;
        }
        setIsOpen(_isOpen);
        if(i===0 && !features){//If the features are not loaded yet
            setFeaturesLoading(true);
            loadFeatures().then(()=>setFeaturesLoading(false))
        }
    };

    const uploadIcon = () => {
        if(!selectedIcon || featureTxt==='')return;
        setIconUploading(true);
        const data = {icon: selectedIcon, name: featureTxt};
        uploadFeature(data)
        .then(name=>{
            showAlert();
            features[name] = data;//Add the uploaded feature on loaded features so it can render on ui
            setFeatureTxt('');
            setSelectedIcon(null);

            //Get the uploaded feature from ui and make it selected as course feature
            const selector = document.getElementById(name);
            selector.checked = true;
            selectFeature({target: selector}, 'features', name);
            setIconUploading(false);
        })
    }

    return (<Card className='overflow-hidden border-dark'>
        <CardHeader tag='h5' onClick={()=>toggle(0)} className='text-white cPointer bg-dark'>
            Course Features
            <FontAwesomeIcon style={{transform: `rotate(${isOpen[0] ? 180 : 0}deg)`}} className='float-right transition' icon={icons.faAngleUp}/>
        </CardHeader>

        <Collapse isOpen={isOpen[0]}>
            <CardBody className='p-2'>
                <AlertMsg type='info' msg='Feature uploaded and added as a feature of this course.' />
                <h4 className='bg-info mb-0 rounded-top overflow-hidden text-white p-2'>
                    Features For Courses
                    <Button title='Add New Feature' onClick={()=>toggle(1)} color='secondary' className='px-1 py-0 float-right'>
                        <FontAwesomeIcon icon={icons.faPlus}/>
                    </Button>
                </h4>

                <div className='border-top-0 text-center rounded-bottom mb-2 bg-primary'>
                    <Collapse isOpen={isOpen[1]}>
                        {iconUploading ? <Spinner className='bg-dark my-2' color='white' /> : <AddFeature
                            icons={icons}
                            FAIcon={FontAwesomeIcon}
                            featureTxt={featureTxt}
                            setFeatureTxt={setFeatureTxt}
                            selectedIcon={selectedIcon}
                            setSelectedIcon={setSelectedIcon}
                            setIconUploading={setIconUploading}
                            uploadIcon={uploadIcon}
                            toggle={()=>toggle(2)}
                        />}
                    </Collapse>
                </div>

                <ListGroup className='featuresWrap'>
                    {featuresLoading ? <Spinner className='mx-auto my-3 bg-info' /> : featuresMap}
                </ListGroup>
            </CardBody>
        </Collapse>
        <IconBox isOpen={isOpen[2]} FAIcon={FontAwesomeIcon} icons={icons} toggle={toggle}/>
    </Card>)
}
export default FeautresBox;