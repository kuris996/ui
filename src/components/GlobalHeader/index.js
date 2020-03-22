import React, { PureComponent } from 'react';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from '../RightContent';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };

    render() {
        const { collapsed, } = this.props;
        return (
            <div className={styles.header}>
                <span className={styles.trigger} onClick={this.toggle} >
                    { collapsed ? (<MenuUnfoldOutlined/>) : (<MenuFoldOutlined/>) }
                </span>
                <Link to="/" className={styles.logo} key="logo">
                    <h1>Ui</h1>
                </Link>
                <RightContent {...this.props} />
            </div>
        );
    }
}