/* eslint-disable  */
import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';

const Header = () => {
    const token = useSelector(state=>state.auth.token);
    return token ? <Navigation/> : <></>;
};
export default Header;