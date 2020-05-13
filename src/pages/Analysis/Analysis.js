import React, { Component, Suspense } from 'react';
import { connect } from 'dva'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import {
    Card,
} from 'antd'

class Analysis extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'chart/fetch',
        });
    }

    render() {
        const {
            chart,
            loading,
        } = this.props

        console.log(loading)

        return (
            <PageHeaderWrapper title="Анализ">
                <Card bordered={false}>
                    <div>Hello World</div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ chart, loading }) => ({
    chart,
    loading: loading.effects['chart/fetch'],
}))(Analysis)