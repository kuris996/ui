import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import GridContent from '@/components/GridContent'
import styles from './Calculation.less'

class Calculation extends Component {
    render() {
        return (
            <GridContent>
                <Card
                    title={
                        <FormattedMessage
                            id="app.calculation.title"
                            defaultMessage="Activity"
                        />
                    }
                    bordered={true}
                />
            </GridContent>
        )
    }
}

export default connect(({ }) => ({
}))(Calculation);
