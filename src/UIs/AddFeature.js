import React from 'react';
import {Input, Button} from 'reactstrap';

const AddFeature = ({icons, FAIcon, featureTxt, setFeatureTxt, selectedIcon, setSelectedIcon, toggle, uploadIcon}) => (<>
    <Input placeholder='Enter The Feature' type='text' className='w-75 m-1 border-0 whitePlaceholder text-white d-inline bg-info' onChange={e=>setFeatureTxt(e.target.value)} value={featureTxt} />

    {selectedIcon ? (
    <p title='Remove This Icon' onClick={()=>setSelectedIcon(null)} className='d-inline-block  border border white py-1 rounded cPointer px-2 singleIcon'>
        <FAIcon icon={icons[selectedIcon]}/>
    </p>) : (
    <Button onClick={toggle} className='p-1 m-1'>
        ICON
    </Button>
    )}

    <Button disabled={featureTxt==='' || !selectedIcon} color='info' className='p-1 m-1' onClick={uploadIcon}>UPLOAD</Button>
</>);
export default AddFeature;