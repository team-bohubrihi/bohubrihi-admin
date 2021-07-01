import React, { useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlert } from '../redux/actionCreators';

const AlertMsg = ({ type, msg }) => {
    const isOpen = useSelector(state=>state.utility.showAlert);
    const dispatch = useDispatch();
    const tAlert = ()=>dispatch(toggleAlert(false));
    useEffect(() => isOpen ? setTimeout(tAlert, 8000) : null);

    return (<Alert className={'bg-'+type} isOpen={isOpen} toggle={tAlert}>
        <strong className='text-white'>{msg}</strong>
    </Alert>);
};
export default AlertMsg;