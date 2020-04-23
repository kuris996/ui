import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    Table, 
    Badge,
    Card,
    Button,
} from 'antd'
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less'
import Link from 'umi/link';

const getValue = obj => Object.keys(obj).map(key => `'${obj[key]}'`).join(',');

const statusMap = {
    'idle' : 'default',
    'running' : 'processing',
    'finished' : 'success', 
    'error' :'error'
};

const capitalize = (s) => {
    if (typeof s !== 'string') 
        return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const expandedRowRender = (record) => {
    const columns = [
        { 
            title: 'Продукт', 
            dataIndex: 'product', 
            key: 'product' 
        },
        { 
            title: 'Набор', 
            dataIndex: 'kitName', 
            key: 'kitName' 
        },
        {
            title: 'Создан',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record) => (
                <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
            ),
        },
    ];

    return <Table columns={columns} dataSource={record.tasks} pagination={false} />;
};

class BacktestingList extends PureComponent {
    state = { selectedRows: [] }

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'backtesting/remove',
            payload: {
                id: selectedRows.map(row => row.id),
            },
            callback: () => {
                this.setState({
                    selectedRows: [],
                })
            }
        })
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'backtesting/fetch',
        });
    }

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            if (filtersArg[key])
                newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {})

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...filters
        };

        if (sorter.field) {
            params.sorter = `${sorter.field}-${sorter.order}`;
        }
        
        dispatch({
            type: 'backtesting/fetch',
            payload: params,
        });
    }

    render() {
        const {
            backtesting: { data },
            loading,
        } = this.props
        const { selectedRows } = this.state;

        const columns = [            
            {
                title: 'Создан',
                dataIndex: 'createdAt',
                key: 'createdAt',
                sorter: true,
                render: (text, record) => (
                    <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
                ),
            },
            {
                title: 'Начал',
                dataIndex: 'startedAt',
                key: 'startedAt',
                sorter: true,
                render: (text, record) => (
                    <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
                ),
            },
            {
                title: 'Закончил',
                dataIndex: 'finishedAt',
                key: 'finishedAt',
                sorter: true,
                render: (text, record) => (
                    <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
                ),
            },
            {
                title: 'Статус',
                dataIndex: 'status',
                key: 'status',
                sorter: true,
                filters: data.filters.status,
                render: (text, record) => (
                    <Badge status={statusMap[text]} text={capitalize(text)} />
                )
            },
        ];

        return (
            <PageHeaderWrapper title="Backtesting">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Link to={"/calculation/backtesting-form"} style={{ marginRight:16 }}>
                                <PlusOutlined/>  Добавить
                            </Link>
                            {selectedRows.length > 0 && (
                                <span>
                                <Button onClick={() => this.handleRemove()}>Удалить</Button>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            loading={loading}
                            data={data}
                            selectedRows={selectedRows}
                            columns={columns}
                            expandedRowRender={record => expandedRowRender(record)}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ backtesting, loading }) => ({
    backtesting,
    loading: loading.models.backtesting
}))(BacktestingList)