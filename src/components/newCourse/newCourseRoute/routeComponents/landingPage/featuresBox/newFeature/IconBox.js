import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';

const IconBox = ({isOpen, icons, FAIcon, toggle}) => {
    const iconNames = [...Object.getOwnPropertyNames(icons)];
    const [isMoreAvailabe, setIsMoreAvailabe] = useState(true);
    const [loadBreak, setLoadBreak] = useState(0);
    const [renderedIcons, setRenderedIcon] = useState([]);

    const loadIcons = () => {
        const len = iconNames.length;
        if(loadBreak>=len)return; //In case no more icon available
        if(loadBreak+52>=len)setIsMoreAvailabe(false); //To stop rendering Load More Button
        const iconsMap = [...renderedIcons];

        let i;
        for(i=loadBreak; i<=loadBreak+52; i++){
            if(i===len)break;
            const _icn = iconNames[i];
            if(_icn==='fas' || _icn==='far' || _icn ==='faFontAwesomeLogoFull' || _icn.indexOf('fa')<0)continue;//To avoid unnecessary property from icon's object

            iconsMap.push(<p className='m-1 cPointer border rounded text-center py-3 singleIcon' onClick={()=>toggle(2, _icn)} key={i}>
                <FAIcon icon={icons[_icn]}/>
            </p>);
        }
        setRenderedIcon(iconsMap);
        setLoadBreak(i);//Keep the lenght of rendered icons so next time it can work as an index
    }

    useEffect(()=>(isOpen && loadBreak<1) ? loadIcons() : null, [isOpen, loadBreak]);

    return (<Modal size='xl' fade={false} isOpen={isOpen}>
        <ModalHeader toggle={()=>toggle(2)} className='p-2 bg-secondary text-white border-0 w-100'>
            Select Icon For Feature
        </ModalHeader>

        <ModalBody className='d-flex flex-wrap p-1 border rounded-bottom bg-dark iconsWrap'>
            {renderedIcons}
            {isMoreAvailabe ? <Button color='primary' className='w-100 mt-1' onClick={loadIcons}>LOAD MORE</Button> : null}
        </ModalBody>
    </Modal>)
}
export default IconBox;