import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
        };
    }

    static getDerivedStateFromProps(nextProps) {
        // clean state
        if (nextProps.selectedRows.length === 0) {
            return {
            selectedRowKeys: []
            };
        }
        return null;
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        const { onSelectRow } = this.props;
        if (onSelectRow) {
            onSelectRow(selectedRows);
        }
        this.setState({ selectedRowKeys });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { data = {}, rowKey, ...rest } = this.props;
        const { list = [], pagination } = data;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: false,
            }),
        };

        return (
            <div className={styles.standardTable}>
                <div className={styles.tableAlert}>
                    <Alert
                        message={
                            <Fragment>
                                Выбрано: 
                                <a style={{ fontWeight: 600 }} style={{ marginLeft: 4 }}>
                                    {selectedRowKeys.length}
                                </a>
                                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                                    Очистить
                                </a>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div>
                <Table
                    rowKey={rowKey || 'id'}
                    rowSelection={rowSelection}
                    dataSource={list}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...rest}
                />
            </div>
        );
    }
}

export default StandardTable;
