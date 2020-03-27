import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import {
    Card,
    Form,
    Input,
    Button,
    Modal,
    message
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { PlusOutlined } from '@ant-design/icons';
import styles from './Table.less';

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

class CreateForm extends React.Component {
    static defaultProps = {
        modalVisible: false,
        modalTitle: 'Добавить factory',
        handleAdd: () => {},
        handleUpdate: () => {},
        handleUpdateModalVisible: () => {},
    }

    formRef = React.createRef();
    
    render() {
        const { modalVisible, modalTitle, handleAdd, handleUpdate, handleModalVisible } = this.props;
        const okHandle = () => {
            this.formRef.current.validateFields()
            .then(fields => {
                this.formRef.current.resetFields();
                const { values } = this.props
                if (values && Object.keys(values).length) {
                    const formVals = { ...values, ...fields };
                    this.setState(
                        {
                            formVals,
                        },
                        () => {
                            handleUpdate(formVals)
                        }
                    )
                } else
                    handleAdd(fields);
            })
            .catch(errorInfo => {
            })
        };
        const formLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 13 },
        };
        return (
            <Modal
                destroyOnClose
                title={modalTitle}
                visible={modalVisible}
                onOk={okHandle}
                onCancel={() => handleModalVisible()}
            >
                <Form ref={this.formRef}
                    initialValues={ this.props.values }
                >
                    <FormItem 
                        {...formLayout}
                        label="product"
                        name="product"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'product'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        {...formLayout}
                        
                        label="seller"
                        name="seller"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'seller'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="factory"
                        name="factory"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'factory'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
};

class FactoryTable extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
    };

    columns = [
        {
            title: 'product',
            dataIndex: 'product',
            sorter: true,
        },
        {
            title: 'seller',
            dataIndex: 'seller',
            sorter: true,
        },
        {
            title: 'factory',
            dataIndex: 'factory',
            sorter: true,
        },
        {
            render: (text, record) => (
                <a onClick={() => this.handleUpdateModalVisible(true, record) }>Изменить</a>
            ),
        }
    ];

    handleModalVisible = (visible) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Добавить factory",
            formValues: {},
        });
    };

    handleUpdateModalVisible = (visible, record) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Изменить factory",
            formValues: record || {},
        });
    }

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'factory/add',
            payload: {
                ...fields,
            }
        })
        message.success('factory успешно добавлен')
        this.handleModalVisible();
    };

    handleUpdate = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'factory/update',
            payload: {
                ...fields,
            }
        })
        message.success('factory успешно обновлен')
        this.handleModalVisible();
    };

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'factory/remove',
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
            type: 'factory/fetch',
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
            type: 'factory/fetch',
            payload: params,
        });
    }

    render() {
        const {
            factory: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, modalTitle, formValues } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleUpdate: this.handleUpdate,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderWrapper title="factory">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button 
                                icon={<PlusOutlined/>} 
                                type="primary" 
                                onClick={() => this.handleModalVisible(true)}
                            >
                                Добавить
                            </Button>
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
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} values={formValues} />
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ factory, loading }) => ({
    factory,
    loading: loading.models.factory
}))(FactoryTable)