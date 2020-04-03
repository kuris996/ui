import React, { Component } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import styles from './HeaderView.less';
import GlobalHeader from '@/components/GlobalHeader';

const { Header } = Layout;

class HeaderView extends Component {
    state = {
        visible: true,
    };

    getHeadWidth = () => {
        return '100%'
    }

    render() {
        const { handleMenuCollapse } = this.props;
        const { visible } = this.state
        const width = this.getHeadWidth();
        const headerView = visible ? (
            <Header 
                style={{ padding: 0, width, zIndex: 3 }}
                className={styles.fixedHeader}
            > 
                <GlobalHeader 
                    onCollapse={handleMenuCollapse}
                    {...this.props} />
            </Header>
        ) : null;
        return (
            <Animate component="" transitionName="fade">
                {headerView}
            </Animate>
        )
    }
}

export default (HeaderView);