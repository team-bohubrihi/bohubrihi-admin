import React from 'react';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import AlertMsg from './AlertMsg';
import {titleChanger} from './helpers';
import '../css/auth.css';

const AuthForm=props=>{
    const alert = props.alertMsg ? <AlertMsg type='danger' msg={props.alertMsg}/> : null;
    const isLogin = props.formType==='login';
    let passFiled=null, link='/login', linkTxt='Go to Login', submitTxt='Search';

    if(isLogin){
        passFiled = (
        <FormGroup className='my-4'>
            <Label>Password</Label>
            <Input type="password" className='mt-1 text-white' value={props.pass} onChange={e=>props.onChangePass(e.target.value)} placeholder="Enter Your Password" />
        </FormGroup>);

        link = '/recover';
        linkTxt = 'Forgot Password?';
        submitTxt = 'Login';
    }

    return (
    <div onLoad={()=>titleChanger(isLogin ? 'Login' : 'Recover Your Password')} className='auth_wrapper'>
        {props.loading ? <Loader/> : <div className='position-absolute rounded border border-white middle overflow-hidden auth_wrap'>
            <Form onSubmit={e=>props.handleSubmit(e)} className='text-white position-relative p-2 h-100 auth_form'>
                <div className='text-center my-4 logo_wrap'>
                    <a target='_blank' rel='noreferrer' href='http://bohubrihi.com'><img alt='bohubrihi' className='rounded-circle' src='/logo.png'/></a>
                </div>
                {alert}
                <FormGroup className='my-4'>
                    <Label>Email</Label>
                    <Input type="text" className='mt-1 text-white' value={props.email} onChange={e=>props.onChangeEmail(e.target.value)} placeholder='Enter Your Email' />
                </FormGroup>
                {passFiled}
                <Button disabled={props.isDisable} type='submit' className='position-relative overflow-hidden noShadowBtn submitBtn'>
                    <span className='position-relative'>{submitTxt}</span>
                </Button>

                <h5 className='text-center mt-5'>
                    <Link className='text-decoration-none text-white' to={link}>{linkTxt}</Link>
                </h5>
            </Form>
        </div>}
    </div>)
}
export default AuthForm;