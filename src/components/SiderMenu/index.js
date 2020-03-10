import React from 'react';
import SiderMenu from './SiderMenu';
import { Drawer } from 'antd';
 
 const SiderMenuWrapper = React.memo(props => {
    const { isMobile, menuData, collapsed, onCollapse } = props;
    return isMobile ? (
        <div></div>
    ) : (
        <SiderMenu {...props} />
    )
 });

 export default SiderMenuWrapper;