import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { toggleAlert } from '../redux/actionCreators';

const mapStateToProps = (state) => ({
    isOpen: state.utility.showAlert,
});

const mapDispatchToProps = (dispatch) => ({
    toggleAlert: (bool) => dispatch(toggleAlert(bool)),
});

const AlertMsg = ({ type, isOpen, msg }) => {
    useEffect(() => {
        if (!isOpen) return;
        setTimeout(() => toggleAlert(false), 5000);
    });

    return (
        <Alert color={type} isOpen={isOpen}>
            <strong>{msg}</strong>
        </Alert>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(AlertMsg);
