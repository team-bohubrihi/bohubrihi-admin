import React, {useState} from 'react';
import {userAuth} from '../../redux/authActionCreators';
import {toggleAlert} from '../../redux/actionCreators';
import {connect} from 'react-redux';
import AuthForm from '../../utils/AuthForm';

const mapStateToProps = state => ({
    loading: state.auth.authLoading
});

const mapDispatchToProps=dispatch=>({
    userAuth: (email, pass) => dispatch(userAuth(email, pass)),
    toggleAlert: bool => dispatch(toggleAlert(bool))
});

const Auth=props=>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [alertMsg, setAlertMsg] = useState(null);
    const isDisable = email==='' || pass==='';

    const handleLogin = e => {
        e.preventDefault();
        if(isDisable)return;
        props.userAuth(email, pass)
        .then(status=>{
            if(status===400 || status===0){
                props.toggleAlert(true);
                setAlertMsg(status===0 ? 'No Internet Conection!' : 'User Not Found!');
            }
        })
        setPass('');
    }

    return <AuthForm
        formType='login'
        alertMsg={alertMsg}
        email={email}
        pass={pass}
        onChangeEmail={setEmail}
        onChangePass={setPass}
        handleSubmit={handleLogin}
        loading={props.loading}
        isDisable={isDisable}
    />
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);