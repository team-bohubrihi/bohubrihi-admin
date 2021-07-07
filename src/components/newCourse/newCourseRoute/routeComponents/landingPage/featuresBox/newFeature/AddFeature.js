import React from 'react';
import {Input, Button} from 'reactstrap';
import IconBox from './IconBox';

const AddFeature = ({icons, FAIcon, featureTxt, setFeatureTxt, selectedIcon, setSelectedIcon, toggle, uploadIcon, isOpen}) => (<div className='p-1'>
    <Input placeholder='Enter The Feature' type='text' className='border-0 whitePlaceholder text-white bg-info mb-1' onChange={e=>setFeatureTxt(e.target.value)} value={featureTxt} />

    {selectedIcon ? (
    <Button title='Remove This Icon' onClick={()=>setSelectedIcon(null)} className='w-50 p-1'>
        <FAIcon icon={icons[selectedIcon]}/>
    </Button>) : (
    <Button onClick={()=>toggle(2)} className='w-50 p-1'>
        ICON
    </Button>
    )}

    <Button disabled={featureTxt==='' || !selectedIcon} color='info' className='p-1 w-50' onClick={uploadIcon}>UPLOAD</Button>

    <IconBox isOpen={isOpen} FAIcon={FAIcon} icons={icons} toggle={toggle}/>
</div>);
export default AddFeature;