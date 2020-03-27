import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    Card,
    Progress,
    Button,
} from 'antd'
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined } from '@ant-design/icons';
import styles from './TaskList.less'
import Link from 'umi/link';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

class TaskList extends PureComponent {
    state = { visible: false, done: false,  selectedRows: [] }

    columns = [
        {
            title: 'Продукт',
            dataIndex: 'product',
            sorter: true,
        },
        {
            title: 'Создан',
            dataIndex: 'createdAt',
            sorter: true,
            render: (text, record) => (
                <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
            ),
        },
        {
            title: 'Начал',
            dataIndex: 'startedAt',
            sorter: true,
            render: (text, record) => (
                <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
            ),
        },
        {
            title: 'Окончил',
            dataIndex: 'finishedAt',
            sorter: true,
            render: (text, record) => (
                <p>{moment(text).format('YYYY-MM-DD HH:mm')}</p>
            ),
        },
        {
            title: 'Процесс',
            dataIndex: 'percent',
            sorter: true,
            render: (text, record) => (
                <Progress percent={text} strokeWidth={6} style={{ width: 180 }} />
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            sorter: true,
        }
    ];

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

        let filters = {}
        Object.keys(filtersArg).reduce((obj, key) => {
            filters[key] = getValue(filtersArg[key]);
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
            task: { task },
            loading,
        } = this.props
        const { selectedRows } = this.state;
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
                            data={task}
                            selectedRows={selectedRows}
                            columns={this.columns}
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