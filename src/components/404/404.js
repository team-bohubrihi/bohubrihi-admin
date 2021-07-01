import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { titleChanger } from '../../utils/helpers';

const NotFound404 = () => {
    const linkClasses = 'm-1 bg-success d-inline-block text-white px-2 py-1 text-decoration-none rounded border border-primary';

    useEffect(()=>titleChanger('404 page not found'), []);

    return(<div className='text-center mt-5'>
        <h2 className='text-danger'>404 NOT FOUND</h2>
        <h3 className='text-warning my-4'>The page you're trying to reach doesn't exit!</h3>
        <Link className={linkClasses} to='/'>Go to Admin Homepage</Link>
        <a className={linkClasses} href='http://bohubrihi.com'>Go to Bohubrihi Homepage</a>
    </div>)
}
export default NotFound404;