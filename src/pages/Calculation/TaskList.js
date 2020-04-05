import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    Card,
    Button,
} from 'antd'
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined } from '@ant-design/icons';
import styles from './styles.less'
import Link from 'umi/link';
import { getModelsPath } from '@/utils/paths'

const getValue = obj => Object.keys(obj).map(key => `'${obj[key]}'`).join(',');

class TaskList extends PureComponent {
    state = { visible: false, selectedRows: [] }

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'task/remove',
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
            type: 'task/fetch',
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
            type: 'task/fetch',
            payload: params,
        });
    }

    render() {
        const {
            task: { data },
            loading,
        } = this.props
        const { selectedRows } = this.state;

        const columns = [
            {
                title: 'Продукт',
                dataIndex: 'product',
                key: 'product',
                sorter: true,
            },
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
                filters: data.filters.status
            },
            {
                key: 'models',
                render: (text, record) => (
                    <span>
                       <Link to={{
                                pathname: "/bucket/models-list",
                                state: getModelsPath(record.kit, record.uuid)
                           }}
                        >
                            Расчет
                        </Link>
                    </span>
                )
            },
        ];

        return (
            <PageHeaderWrapper title="Расчеты" >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Link to={"/calculation/task-form"} style={{ marginRight:16 }}>
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
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ task, loading }) => ({
    task,
    loading: loading.models.task
}))(TaskList);