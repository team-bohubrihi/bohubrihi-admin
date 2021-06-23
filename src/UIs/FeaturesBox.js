import React, {useState} from 'react';
import {Collapse, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Input, FormGroup, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

const FeautresBox = props => {
    const [isOpen, setIsOpen] = useState([false, false, false]);
    const rotate = isOpen[0] ? 180 : 0;
    const [loadBreak, setLoadBreak] = useState(0);
    const iconNames = [...Object.getOwnPropertyNames(icons)];
    const [renderedIcon, setRenderedIcon] = useState([]);
    const [isMoreIconAvailabe, setIsMoreIconAvailabe] = useState(true);
    const [featureTxt, setFeatureTxt] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const {loadFeatures, features, uploadFeature, selectFeature} = props;

    const featuresMap = [];
    if(features){
        for(let feat in features){
            const _feat = features[feat];
            featuresMap.push(<ListGroupItem key={feat} className='bg-dark p-0 singleFeature'>
                <Row className='m-0'>
                    <Col className='pt-3' xl='1' lg='1' md='1' sm='1' xs='2'>
                        <FormGroup check className='d-block text-center'>
                            <Input id={feat} onChange={e=>selectFeature(e, 'features', feat)} className='cPointer mt-2' type='checkbox' />
                        </FormGroup>
                    </Col>

                    <Col className='bg-info position-relative' xl='1' lg='1' md='1' sm='1' xs='2'>
                        <p className='position-absolute middle'>
                            <FontAwesomeIcon icon={icons[_feat.icon]}/>
                        </p>
                    </Col>

                    <Col className='pt-3 pb-2' xl='10' lg='10' md='10' sm='10' xs='8'>
                        <p className='text-white'>{_feat.name}</p>
                    </Col>
                </Row>
            </ListGroupItem>)
        }
    }

    const toggle = (i, icon=null) => {
        let _isOpen = [...isOpen];
        _isOpen[i] = !_isOpen[i];
        if(i===2 && loadBreak<1 && _isOpen[i] && !icon)loadIcons();
        if(icon){
            setSelectedIcon(icon);
            _isOpen[i]=false;
        }
        if(i===0 && !features)loadFeatures();

        setIsOpen(_isOpen);
    };

    const loadIcons = () => {
        const len = iconNames.length;
        if(loadBreak>=len)return;
        if(loadBreak+52>=len)setIsMoreIconAvailabe(false);
        const iconsMap = [...renderedIcon];

        let i;
        for(i=loadBreak; i<=loadBreak+52; i++){
            if(i===len)break;
            const _icn = iconNames[i];
            if(_icn==='fas' || _icn ==='faFontAwesomeLogoFull' || _icn.indexOf('fa')<0)continue;
            iconsMap.push(<p onClick={()=>{toggle(2, _icn)}} key={i} className='m-1 cPointer border border-white rounded text-center py-2 singleIcon'><FontAwesomeIcon icon={icons[_icn]}/></p>);
        }
        setRenderedIcon(iconsMap);
        setLoadBreak(i);
    }

    const uploadIcon = () => {
        if(!selectedIcon || featureTxt==='')return;
        const data = {icon: selectedIcon, name: featureTxt};
        uploadFeature(data)
        .then(name=>{
            features[name] = data;
            setFeatureTxt('');
            setSelectedIcon(null);
            const selector = document.getElementById(name);
            selector.checked = true;
            selectFeature({target: selector}, 'features', name)
        })
    }

    return (<>
        <Card className='overflow-hidden border-dark'>
            <CardHeader tag='h5' onClick={()=>toggle(0)} className='text-white cPointer bg-dark'>
                Course Features
                <FontAwesomeIcon style={{transform: `rotate(${rotate}deg)`, transition: '.5s'}} className='float-right' icon={icons.faAngleUp}/>
            </CardHeader>

            <Collapse isOpen={isOpen[0]}>
                <CardBody className='p-2'>
                    <h4 className='bg-info mb-0 rounded-top overflow-hidden text-white p-2'>
                        Features For Courses
                        <Button title='Add New Feature' onClick={()=>toggle(1)} color='secondary' className='px-1 py-0 float-right'>
                            <FontAwesomeIcon icon={icons.faPlus}/>
                        </Button>
                    </h4>

                    <div className='border-top-0 rounded-bottom mb-2 bg-primary'>
                        <Collapse isOpen={isOpen[1]}>
                            <Input placeholder='Enter The Feature' type='text' className='w-75 m-1 border-0 whitePlaceholder text-white d-inline bg-info' onChange={e=>setFeatureTxt(e.target.value)} value={featureTxt} />

                            {selectedIcon ? (
                            <p title='Remove This Icon' onClick={()=>setSelectedIcon(null)} className='d-inline-block  border border white py-1 rounded cPointer px-2 singleIcon'>
                                <FontAwesomeIcon icon={icons[selectedIcon]}/>
                            </p>) : (
                            <Button onClick={()=>toggle(2)} className='p-1 m-1'>
                                ICON
                            </Button>
                            )}

                            <Button disabled={featureTxt==='' || !selectedIcon} color='info' className='p-1 m-1' onClick={uploadIcon}>UPLOAD</Button>
                        </Collapse>
                    </div>

                    <ListGroup className='featuresWrap'>{featuresMap}</ListGroup>
                </CardBody>
            </Collapse>
        </Card>

        <Modal isOpen={isOpen[2]}>
            <ModalHeader toggle={()=>toggle(2)} className='p-2 bg-secondary text-white w-100'>
                Select Icon For Feature
            </ModalHeader>

            <ModalBody className='p-2 bg-info iconsWrap'>
                <div className='d-flex flex-wrap p-1 bg-secondary border border-white rounded '>{renderedIcon}</div>
            </ModalBody>

            <ModalFooter className='bg-success p-0'>
                {isMoreIconAvailabe ? <button className='mt-1 w-100 my-2 dashedBtn' onClick={loadIcons}>Load More</button> : null}
            </ModalFooter>
        </Modal>
    </>)
}
export default FeautresBox;