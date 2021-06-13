import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import '../css/auth.css';
import AlertMsg from './AlertMsg';
import { titleChanger } from './helpers';
import Loader from './Loader';

const AuthForm = (props) => {
    const {
        alertMsg,
        formType,
        loading,
        email,
        isDisable,
        pass,
        onChangePass,
        handleSubmit,
        onChangeEmail,
    } = props;

    const alert = alertMsg ? <AlertMsg type="danger" msg={alertMsg} /> : null;
    const isLogin = formType === 'login';
    let passFiled = null;
    let link = '/login';
    let linkTxt = 'Go to Login';
    let submitTxt = 'Search';

    if (isLogin) {
        passFiled = (
            <FormGroup className="my-4">
                <Label>Password</Label>
                <Input
                    type="password"
                    className="mt-1 text-white"
                    value={pass}
                    onChange={(e) => onChangePass(e.target.value)}
                    placeholder="Enter Your Password"
                />
            </FormGroup>
        );

        link = '/recover';
        linkTxt = 'Forgot Password?';
        submitTxt = 'Login';
    }

    return (
        <div
            onLoad={() => titleChanger(isLogin ? 'Login' : 'Recover Your Password')}
            className="auth_wrapper"
        >
            {loading ? (
                <Loader />
            ) : (
                <div className="position-absolute rounded border border-white middle overflow-hidden auth_wrap">
                    <Form
                        onSubmit={(e) => handleSubmit(e)}
                        className="text-white position-relative p-2 h-100 auth_form"
                    >
                        <div className="text-center my-4 logo_wrap">
                            <a target="_blank" rel="noreferrer" href="http://bohubrihi.com">
                                <img alt="bohubrihi" className="rounded-circle" src="/logo.png" />
                            </a>
                        </div>
                        {alert}
                        <FormGroup className="my-4">
                            <Label>Email</Label>
                            <Input
                                type="text"
                                className="mt-1 text-white"
                                value={email}
                                onChange={(e) => onChangeEmail(e.target.value)}
                                placeholder="Enter Your Email"
                            />
                        </FormGroup>
                        {passFiled}
                        <Button
                            disabled={isDisable}
                            type="submit"
                            className="position-relative overflow-hidden noShadowBtn submitBtn"
                        >
                            <span className="position-relative">{submitTxt}</span>
                        </Button>

                        <h5 className="text-center mt-5">
                            <Link className="text-decoration-none text-white" to={link}>
                                {linkTxt}
                            </Link>
                        </h5>
                    </Form>
                </div>
            )}
        </div>
    );
};
export default AuthForm;
