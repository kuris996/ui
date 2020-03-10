import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import styles from './index.less';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

let firstMount = true;

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: []
        }
    }

    componentDidMount() {
        firstMount = false;
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname, flatMenuKeysLen } = state;

        return null;
    }

    render() {
        const { collapsed, onCollapse, isMobile} = this.props;
        const { openKeys } = this.state;
        const defaultProps = collapsed ? {} : { openKeys }

        const siderClassName = classNames(styles.sider, {
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
                <Suspense fallback={null} >
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        style={{ padding: '0px 0', width: '100%' }}
                        {...defaultProps}
                    />
                </Suspense>
            </Sider>
        )
    }
}