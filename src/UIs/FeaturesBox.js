import React, {useState} from 'react';
import {Collapse, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Input, FormGroup, Row, Col, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

const FeautresBox = props => {
    const [isOpen, setIsOpen] = useState([false, false, false]);
    const rotate = isOpen[0] ? 180 : 0;
    const [loadBreak, setLoadBreak] = useState(0);
    const iconNames = [...Object.getOwnPropertyNames(icons)];
    const [renderedIcon, setRenderedIcon] = useState([]);
    const [isMoreIconAvailabe, setIsMoreIconAvailabe] = useState(true);

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
            iconsMap.push(<p key={i} className='m-1 cPointer border border-white rounded text-center py-2 singleIcon'><FontAwesomeIcon icon={icons[_icn]}/></p>);
        }
        setRenderedIcon(iconsMap);
        setLoadBreak(i);
    }

    const toggle = i => {
        if(i===2 && loadBreak<1)loadIcons();
        let _isOpen = [...isOpen];
        _isOpen[i] = !_isOpen[i];
        setIsOpen(_isOpen);
    };
    return (<>
        <Card className='overflow-hidden border-secondary'>
            <CardHeader tag='h5' onClick={()=>toggle(0)} className='text-white cPointer bg-secondary'>
                Course Features
                <FontAwesomeIcon style={{transform: `rotate(${rotate}deg)`, transition: '.5s'}} className='float-right' icon={icons.faAngleUp}/>
            </CardHeader>

            <Collapse isOpen={isOpen[0]}>
                <CardBody className='p-2'>
                    <h4 className='bg-info mb-0 rounded-top overflow-hidden text-white p-2'>
                        Features For Courses
                        <Button onClick={()=>toggle(1)} color='secondary' className='px-1 py-0 float-right'>
                            <FontAwesomeIcon icon={icons.faPlus}/>
                        </Button>
                    </h4>

                    <div className='border-top-0 rounded-bottom mb-2 bg-primary'>
                        <Collapse isOpen={isOpen[1]}>
                            <Input placeholder='Enter The Feature' type='text' className='w-75 m-1 bg-transparent whitePlaceholder text-white d-inline' />
                            <Button onClick={()=>toggle(2)} className='p-1 m-1'>ICON</Button>
                            <Button color='info' className='p-1 m-1'>UPLOAD</Button>
                        </Collapse>
                    </div>

                    <ListGroup>
                        <ListGroupItem className='bg-dark p-0 singleFeature'>
                            <Row className='m-0'>
                                <Col className='pt-3' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <FormGroup check className='d-block text-center'>
                                        <Input className='cPointer mt-2' type='checkbox' />
                                    </FormGroup>
                                </Col>

                                <Col className='bg-info position-relative' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <p className='position-absolute middle'>
                                        <FontAwesomeIcon icon={icons.faAngry}/>
                                    </p>
                                </Col>

                                <Col className='pt-3 pb-2' xl='10' lg='10' md='10' sm='10' xs='8'>
                                    <p className='text-white'>Cras justo odio</p>
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem className='bg-dark p-0 singleFeature'>
                            <Row className='m-0'>
                                <Col className='pt-3' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <FormGroup check className='d-block text-center'>
                                        <Input className='cPointer mt-2' type='checkbox' />
                                    </FormGroup>
                                </Col>

                                <Col className='bg-info position-relative' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <p className='position-absolute middle'>
                                        <FontAwesomeIcon icon={icons.faAngry}/>
                                    </p>
                                </Col>

                                <Col className='pt-3 pb-2' xl='10' lg='10' md='10' sm='10' xs='8'>
                                    <p className='text-white'>Cras justo odio</p>
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem className='bg-dark p-0 singleFeature'>
                            <Row className='m-0'>
                                <Col className='pt-3' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <FormGroup check className='d-block text-center'>
                                        <Input className='cPointer mt-2' type='checkbox' />
                                    </FormGroup>
                                </Col>

                                <Col className='bg-info position-relative' xl='1' lg='1' md='1' sm='1' xs='2'>
                                    <p className='position-absolute middle'>
                                        <FontAwesomeIcon icon={icons.faAngry}/>
                                    </p>
                                </Col>

                                <Col className='pt-3 pb-2' xl='10' lg='10' md='10' sm='10' xs='8'>
                                    <p className='text-white'>Cras justo odio</p>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
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