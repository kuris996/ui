import React, { PureComponent, createElement } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    List,
    Card,
    Progress,
    Button,
    Dropdown,
    Menu,
    Table,
} from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined } from '@ant-design/icons';
import styles from './TaskList.less'
import Link from 'umi/link';


class TaskList extends PureComponent {
    state = { visible: false, done: false }

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

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/fetch',
        });
    }

    render() {
        const {
            task: { task },
            loading,
        } = this.props

        return (
            <PageHeaderWrapper title="Расчеты" >
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Link to={"/calculation/task-form"} style={{ width: '100%' }}>
                                <PlusOutlined/>  Добавить
                            </Link>
                        </div>

                        <Table
                            rowKey={'id'}
                            loading={loading}
                            dataSource={task}
                            columns={this.columns}
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