import React, {useEffect} from 'react';
import {Alert} from 'reactstrap';
import {toggleAlert} from '../redux/actionCreators';
import {connect} from 'react-redux';

const mapStateToProps=state=>({
    isOpen: state.utility.showAlert
});

const mapDispatchToProps=dispatch=>({
    toggleAlert: bool=>dispatch(toggleAlert(bool))
});

const AlertMsg = props => {
    useEffect(()=>{
        if(!props.isOpen)return;
        setTimeout(()=>props.toggleAlert(false), 5000)
    });

    return <Alert color={props.type} isOpen={props.isOpen}><strong>{props.msg}</strong></Alert>;
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertMsg);