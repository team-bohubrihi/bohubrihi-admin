import React, {useState} from 'react';
import {Spinner, Collapse, Card, CardHeader, CardBody, Button} from 'reactstrap';
import AddFeature from './newFeature/AddFeature';
import Features from './features/Features';
import AlertMsg from '../../../../../../utils/AlertMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

const FeautresBox = ({loadFeatures, features, uploadFeature, selectFeature}) => {
    const [isOpen, setIsOpen] = useState([false, false, false]);//toggler for two collapses and IconBox
    const [featuresLoading, setFeaturesLoading] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null);//The selected icon for new feature
    const [featureTxt, setFeatureTxt] = useState('');//The new feature text
    const [iconUploading, setIconUploading] = useState(false);//Whether the new feature is uploading

    const toggle = (i, icon=null) => {
        let _isOpen = [...isOpen];
        _isOpen[i] = !_isOpen[i];
        if(icon){//If an icon is selected to upload, the icon box should be closed
            setSelectedIcon(icon);
            _isOpen[i]=false;
        }
        setIsOpen(_isOpen);
        if(i===0 && !features){//If the features are not loaded yet, it should be loaded for only once
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
            features[name] = data;//Add the uploaded feature on loaded features so it can render on ui
            setFeatureTxt('');
            setSelectedIcon(null);

            //Get the uploaded feature from ui and make it selected as course feature
            const selector = document.getElementById(name);
            selector.checked = true;
            selector.scrollIntoView({behavior: "smooth", block: "end"});
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
                <h5 className='bg-info mb-0 rounded-top overflow-hidden text-white p-2'>
                    Features For Courses
                    <Button title='Add New Feature' onClick={()=>toggle(1)} color='secondary' className='px-1 py-0 float-right'>
                        <FontAwesomeIcon icon={icons.faPlus}/>
                    </Button>
                </h5>

                <div className='border-top-0 rounded-bottom mb-1 bg-primary'>
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
                            toggle={toggle}
                            isOpen={isOpen[2]}
                        />}
                    </Collapse>
                </div>

                <Features
                    features={features}
                    selectFeature={selectFeature}
                    FAIcon={FontAwesomeIcon}
                    icons={icons}
                    loading={featuresLoading}
                />
            </CardBody>
        </Collapse>
    </Card>)
}
export default FeautresBox;