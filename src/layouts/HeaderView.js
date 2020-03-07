import React, { Component } from 'react';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './HeaderView.less';
import TopNavHeader from '@/components/TopNavHeader';

const { Header } = Layout;

class HeaderView extends Component {
    state = {
        visible: true,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { visible } = this.state
        const width = '100%'
        const headerView = visible ? (
            <Header style={{ padding: 0, width, zIndex: 2 }}>
                <TopNavHeader {...this.props} />
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