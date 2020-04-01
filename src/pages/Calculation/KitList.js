import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    Card,
    Dropdown,
    Button,
    Menu
} from 'antd'
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import styles from './styles.less'
import Link from 'umi/link';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

class KitList extends PureComponent {
    state = { 
        visible: false, 
        selectedRows: [] 
    }

    

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'kit/remove',
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
            type: 'kit/fetch',
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
            type: 'kit/fetch',
            payload: params,
        });
    }
    
    render() {
        const {
            kit: { kit },
            loading,
        } = this.props
        const { selectedRows } = this.state;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
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
                sorter: true
            },
            {
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Link>Подробнее</Link>
                    </span>
                )
            }
        ]

        return (
            <PageHeaderWrapper title="Наборы">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Link  to={"/calculation/kit-form"} style={{ marginRight:16 }}>
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
                            data={kit}
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

export default connect(({ kit, loading }) => ({
    kit,
    loading: loading.models.kit
}))(KitList);