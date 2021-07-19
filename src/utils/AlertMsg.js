import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAlert } from '../redux/actionCreators';

const AlertMsg = () => {
    const {isOpen, type, msg, callback} = useSelector(({utility})=>({
        isOpen: utility.showAlert,
        type: utility.alertType,
        msg: utility.alertMsg,
        callback: utility.alertCallback
    }));

    const dispatch = useDispatch();
    const tAlert = ()=>{
        dispatch(toggleAlert(false));
        callback ? callback() : null;
    }
    useEffect(() => isOpen ? setTimeout(tAlert, 8000) : null, [isOpen]);

    return (<Modal isOpen={isOpen}>
        <ModalBody className={'rounded-top m-0 h5 text-white bg-'+type}>
            <strong>{type==='success' ? '' : 'Error! '}</strong> {msg}
        </ModalBody>

        <ModalFooter className='p-0'>
            <Button className='px-3' color='info' onClick={tAlert} size='sm'>OK</Button>
        </ModalFooter>
    </Modal>)
}
export default AlertMsg;