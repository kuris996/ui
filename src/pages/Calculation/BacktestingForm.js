import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    Card,
    Button,
} from 'antd'
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'

const getValue = obj => Object.keys(obj).map(key => `'${obj[key]}'`).join(',');

class BacktestingForm extends PureComponent {
    state = { selectedRows: [] }

    validate = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        dispatch({
            type: 'backtesting/submit',
            payload: { ...selectedRows },
        })
        this.setState({
            selectedRows: []
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
                title: 'Набор',
                dataIndex: 'kitName',
                key: 'kitName',
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
        ];

        return (
            <PageHeaderWrapper
                    title="Новый Back-Testing"
                    wrapperClassName={styles.form}
                >
                <Card bordered={false}>
                    <div className={styles.tableList}>
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
                {selectedRows.length > 0 && (
                    <FooterToolbar>
                        <Button type="primary" onClick={this.validate}>
                            Создать
                        </Button>
                    </FooterToolbar>
                )}
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ task, loading }) => ({
    task,
    loading: loading.models.task
}))(BacktestingForm);