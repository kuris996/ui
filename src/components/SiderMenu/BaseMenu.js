import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Menu, Icon } from 'antd'
import Link from 'umi/link'
import { urlToList } from '../_utils/pathTools'
import styles from './index.less'

const { SubMenu } = Menu;

export default class BaseMenu extends PureComponent {

    getRef = ref => {
        this.wrap = ref;
    };

    render() {
        const {
            openKeys,
            location: { pathname },
            className,
            collapsed,
            layout
        } = this.props;
              
        let props = {};

        const { handleOpenChange, style, menuData } = this.props;
        const cls = classNames(className, {});

        return (
            <>
                <Menu
                    key="Menu"
                    style={style}
                    className={cls}
                    {...props}
                >
                </Menu>
                <div ref={this.getRef} />
            </>
        )
    }
}

