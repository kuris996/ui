import React from 'react';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from '../_utils/menuTools'
 
 const SiderMenuWrapper = React.memo(props => {
    const { isMobile, menuData } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return isMobile ? (
        <div></div>
    ) : (
        <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
    )
 });

 export default SiderMenuWrapper;