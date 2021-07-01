import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { toggleAlert } from '../../redux/actionCreators';
import AuthForm from './AuthForm';

const Recover = () => {
    const loading = useSelector(({auth})=>auth.authLoading);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    // const [alertMsg, setAlertMsg] = useState(null);
    const isDisable = email === '';

    const handleRecover = (e) => {
        e.preventDefault();
        console.log('under processing');
    };

    return (
        <AuthForm
            formType="recover"
            // alertMsg={alertMsg}
            email={email}
            onChangeEmail={setEmail}
            handleSubmit={handleRecover}
            loading={loading}
            isDisable={isDisable}
            dispatch={dispatch}
        />
    );
};
export default Recover;