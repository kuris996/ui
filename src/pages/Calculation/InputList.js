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

        const renderSize = (value) => {
            let size = parseInt(value)
            if (size < 1024)
                return size + " Б"
            if (size < 1024 * 1024)
                return (size / 1024.0).toString() + " КБ"
            if (size < 1024 * 1024 * 1024)
                return (size / 1024.0 / 1024.0).toString() + " ГБ"
            if (size < 1024 * 1024 * 1024 * 1024)
                return (size / 1024.0 / 1024.0 / 1024.0).toString() + " TБ"
            return size.toString()
        }

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
                key: 'size',
                render: (text, recored) => (
                    <p>{renderSize(text)}</p>
                )
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
                <Card className={styles.card} bordered={false}>
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
