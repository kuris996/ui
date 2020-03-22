import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import moment from 'moment';
import Link from 'umi/link';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Steps,
    Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const status = ['关闭', '运行中', '已上线', '异常'];

class FOBTable extends PureComponent {
    state = {
        selectedRows: [],
    };

    columns = [
        {
            title: 'Год',
            dataIndex: 'year',
        },
        {
            title: 'Месяц',
            dataIndex: 'month',
        },
        {
            title: 'Продукт',
            dataIndex: 'product',
        },
        {
            title: 'Продавец',
            dataIndex: 'seller'
        },
        {
            title: 'Цена',
            dataIndex: 'foreign_price',
        },
        {
            title: 'Расходы',
            dataIndex: 'foreign_costs'
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'fob/fetch',
        });
    }

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize
        };
        
        dispatch({
            type: 'fob/fetch',
            payload: params,
        });
    }

    render() {
        const {
            fob: { data },
            loading,
        } = this.props;
        const { selectedRows } = this.state;
        return (
            <PageHeaderWrapper title="FOB">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <StandardTable
                            loading={loading}
                            data={data}
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

export default connect(({ fob, loading }) => ({
    fob,
    loading: loading.models.fob
}))(FOBTable)