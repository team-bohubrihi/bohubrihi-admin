import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

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

            iconsMap.push(<p className='m-1 cPointer border border-white rounded text-center py-2 singleIcon' onClick={()=>toggle(2, _icn)} key={i}>
                <FAIcon icon={icons[_icn]}/>
            </p>);
        }
        setRenderedIcon(iconsMap);
        setLoadBreak(i);//Keep the lenght of rendered icons so next time it can work as an index
    }

    useEffect(()=>(isOpen && loadBreak<1) ? loadIcons() : null, [isOpen, loadBreak]);

    return (<Modal isOpen={isOpen}>
        <ModalHeader toggle={()=>toggle(2)} className='p-2 bg-secondary text-white w-100'>
            Select Icon For Feature
        </ModalHeader>

        <ModalBody className='p-2 bg-info iconsWrap'>
            <div className='d-flex flex-wrap p-1 bg-secondary border border-white rounded '>{renderedIcons}</div>
        </ModalBody>

        <ModalFooter className='bg-success p-0'>
            {isMoreAvailabe ? <button className='mt-1 w-100 my-2 dashedBtn' onClick={loadIcons}>Load More</button> : null}
        </ModalFooter>
    </Modal>)
}
export default IconBox;