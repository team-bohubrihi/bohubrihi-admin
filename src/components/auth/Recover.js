import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleAlert } from '../../redux/actionCreators';
import AuthForm from '../../UIs/AuthForm';

const mapStateToProps = (state) => ({
    loading: state.auth.authLoading,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAlert: (bool) => dispatch(toggleAlert(bool)),
});

const Recover = (props) => {
    const [email, setEmail] = useState('');
    const { loading } = props;
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
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Recover);
