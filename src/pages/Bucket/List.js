import React, { PureComponent } from 'react'
import { connect } from 'dva'
import {
    Card,
    Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import moment from 'moment';

class List extends PureComponent {
    componentDidMount() {
        const { dispatch, location: { state } } = this.props;
        dispatch({
            type: 'input/fetch',
            payload: { 
                prefix: state
             }
        })
    }

    render() {
        const {
            input: { list },
            loading,
            title,
        } = this.props

        const renderSize = (value) => {
            let size = parseInt(value)
            if (size < 1024)
                return size + " Б"
            if (size < 1024 * 1024) 
                return (size / 1024.0).toFixed(2).toString() + " КБ"
            if (size < 1024 * 1024 * 1024)
                return (size / 1024.0 / 1024.0).toFixed(2).toString() + " МБ"
            if (size < 1024 * 1024 * 1024 * 1024)
                return (size / 1024.0 / 1024.0 / 1024.0).toFixed(2).toString() + " ГБ"
            if (size < 1024 * 1024 * 1024 * 1024 * 1024)
                return (size / 1024.0 / 1024.0 / 1024.0 / 1024.0).toFixed(2).toString() + " ТБ"
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
            <PageHeaderWrapper title={title}>
                <Card bordered={false}>
                    <Table 
                        loading={loading}
                        columns={columns}
                        dataSource={list}
                    />
                </Card>

            </PageHeaderWrapper>
        )
    }
}

export default connect(({ input, loading }) => ({
    input,
    loading: loading.models.input
}))(List);
