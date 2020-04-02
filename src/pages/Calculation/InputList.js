import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
    Card,
    Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './styles.less'
import Link from 'umi/link';

import moment from 'moment';

class InputList extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'input/fetch'
        })
    }

    render() {
        const {
            input: { list },
            loading,
        } = this.props

        const columns = [
            {
                title: 'Имя',
                dataIndex: 'key',
                key: 'key',
                render: (text, record) => (
                    <a href={record.url}>{text}</a>
                )
            },
            {
                title: 'Размер',
                dataIndex: 'size',
                key: 'size'
            },
            {
                title: 'Последнее изменение',
                dataIndex: 'lastModified',
                key: 'lastModified',
                render: (text, record) => (
                    <p>{moment(text).format('DD MMMM YYYY HH:mm')}</p>
                ),
            }
        ]

        return (
            <PageHeaderWrapper title="Вводные">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Table 
                            loading={loading}
                            columns={columns}
                            dataSource={list}
                        />
                    </div>
                </Card>

            </PageHeaderWrapper>
        )
    }
}

export default connect(({ input, loading }) => ({
    input,
    loading: loading.models.input
}))(InputList);
