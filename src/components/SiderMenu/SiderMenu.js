import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import { getDefaultCollapsedSubMenus } from '../_utils/menuTools'
import Link from 'umi/link';
import styles from './index.less';

const BaseMenu = React.lazy(() => import('../BaseMenu'));
const { Sider } = Layout;

let firstMount = true;

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        }
    }

    componentDidMount() {
        firstMount = false;
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname, flatMenuKeysLen } = state;
        if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
            return {
                pathname: props.location.pathname,
                flatMenuKeysLen: props.flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props),
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key)
                return item.key === key || item.path === key;
        })
        return false;
    }

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    };

    render() {
        const { collapsed, onCollapse, isMobile} = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys }

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderBar]: true,
            [styles.light]: false
        });

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                width={256}
                theme={'dark'}
                className={siderClassName}
            >
                <div className={styles.logo} id="logo"/>
                <Suspense fallback={null}>
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        handleOpenChange={this.handleOpenChange}
                        onOpenChange={this.handleOpenChange}
                        style={{ padding: '0px 0', width: '100%' }}
                        {...defaultProps}
                    />
                </Suspense>
            </Sider>
        )
    }
}