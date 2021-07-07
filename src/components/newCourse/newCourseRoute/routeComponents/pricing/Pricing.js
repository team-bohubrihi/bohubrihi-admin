import React from 'react';
import {Input, FormGroup, Label} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {updateCourseData} from '../../../../../redux/actionCreators';

const Pricing = () => {
    const {id, price, discount, totalPrice} = useSelector(({courseManage})=>({
        id: courseManage.newCourse.id,
        price: courseManage.newCourse.price,
        discount: courseManage.newCourse.discount,
        totalPrice: courseManage.newCourse.totalPrice
    }));
    const isDisabled = price==='' || price<1;

    const dispatch = useDispatch();
    const updatePrice = e => {
        const isDiscount = e.target.name==='discount';
        if(isDiscount && isDisabled)return;
        if(isDiscount)e.target.totalPrice = Math.round(price-(price*(e.target.value/100)));
        dispatch(updateCourseData(e, id));
    }

    return (
        <>
            <h5 className='p-2 rounded text-light bg-secondary mb-3 '>Define your course price and discount. Leave these blank if this is a free course.</h5>

            <FormGroup className='mb-4'>
                <Label className='text-info'>Course Price</Label>
                <Input name='price' placeholder='Price' value={price} onChange={e=>updatePrice(e)} type='number' autoComplete='off' />
            </FormGroup>

            <FormGroup>
                <Label className='text-info'>Discount, leave it blank if there is no discount</Label>
                <Input disabled={isDisabled} name='discount' placeholder='Discount(%)' value={discount} onChange={e=>updatePrice(e)} type='number' autoComplete='off' />
            </FormGroup>

            <h3 className='mt-4 text-secondary'>Total Price: <strong>{totalPrice!=='Free' ? totalPrice+'tk.' : totalPrice}</strong></h3>
        </>
    )
}

export default Pricing;