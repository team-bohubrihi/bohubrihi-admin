import React from 'react';
import '../css/loader.css';

const Loader = () => {
    const pAbs = 'position-absolute ';
    const round = 'rounded-circle ';
    const wh100 = 'w-100 h-100';
    return(
    <div className={pAbs+round+' middle wrap'}>
        <div className={pAbs+' middle'}>
            <img src='/logo.png' className={round+' logoImg'} alt='Loading'/>
        </div>
        <div className="c1_wrap">
            <div className={pAbs+round+wh100+' c1'}></div>
            <div className={pAbs+round+wh100+' c2'}></div>
        </div>
        <div className={wh100+' c2_wrap'}>
            <div className={pAbs+round+' c3'}></div>
            <div className={pAbs+round+' c4'}></div>
        </div>
    </div>)
};
export default Loader;