import React, { Component } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import styles from './HeaderView.less';
import GlobalHeader from '@/components/GlobalHeader';

const { Header } = Layout;

class HeaderView extends Component {
    state = {
        visible: true,
    };

    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, { passive: true });
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }

    getHeadWidth = () => {
        return '100%'
    }

    handScroll = () => {
        const { visible } = this.state;    
    };

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

export default connect(({ }) => ({}))(HeaderView);