import React from 'react';
import {ListGroupItem, Input, FormGroup, Row, Col} from 'reactstrap';

const Feature = ({id, selectFeature, icon, name}) => (<ListGroupItem className='bg-dark p-0 singleFeature'>
    <Row className='m-0'>
        <Col className='pt-3' xl='1' lg='1' md='1' sm='1' xs='2'>
            <FormGroup check className='d-block text-center'>
                <Input id={id} onChange={e=>selectFeature(e, 'features', id)} className='cPointer mt-2' type='checkbox' />
            </FormGroup>
        </Col>

        <Col className='bg-info position-relative' xl='1' lg='1' md='1' sm='1' xs='2'>
            <p className='position-absolute middle'>{icon}</p>
        </Col>

        <Col className='pt-3 pb-2' xl='10' lg='10' md='10' sm='10' xs='8'>
            <p className='text-white'>{name}</p>
        </Col>
    </Row>
</ListGroupItem>);
export default Feature;