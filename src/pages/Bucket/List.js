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
        const { dispatch, match : { params } } = this.props;
        const { kit, uuid} = params
        dispatch({
            type: 'input/fetch',
            payload: { 
                kit, uuid
             }
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
                dataIndex: 'name',
                key: 'key',
                render: (text, record) => (
                    <>
                    { record.url ? (
                        <a href={record.url}>{text}</a>
                    ) : <span>{text}</span>
                    }
                    </>
                    
                )
            },
            {
                title: 'Размер',
                dataIndex: 'size',
                key: 'size',
                render: (text, record) => (
                    <>
                    { record.size ? (
                        <p>{renderSize(text)}</p>
                    ) : null
                    }
                    </>
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
            <PageHeaderWrapper title="Подробнее">
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
