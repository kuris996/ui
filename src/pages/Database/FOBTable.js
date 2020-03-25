import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import {
    Card,
    Form,
    Input,
    Button,
    InputNumber,
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
        modalTitle: 'Добавить FOB',
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
                        
                        label="year"
                        name="year"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'year'",
                            },
                        ]}
                    >
                        <InputNumber />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="month"
                        name="month"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'month'",
                            },
                        ]}
                    >
                        <InputNumber />
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
                        label="foreign_price"
                        name="foreign_price"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'foreign_price'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="foreign_costs"
                        name="foreign_costs"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'foreign_costs'",
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

class FOBTable extends PureComponent {
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
            title: 'year',
            dataIndex: 'year',
            sorter: true,
        },
        {
            title: 'month',
            dataIndex: 'month',
            sorter: true,
        },
        {
            title: 'seller',
            dataIndex: 'seller',
            sorter: true,
        },
        {
            title: 'foreign_price',
            dataIndex: 'foreign_price',
            sorter: true,
        },
        {
            title: 'foreign_costs',
            dataIndex: 'foreign_costs',
            sorter: true,
        },
        {
            render: (text, record) => (
                <Fragment>
                  <a onClick={() => this.handleUpdateModalVisible(true, record) }>Изменить</a>
                </Fragment>
            ),
        }
    ];

    handleModalVisible = (visible) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Добавить FOB",
            formValues: {},
        });
    };

    handleUpdateModalVisible = (visible, record) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Изменить FOB",
            formValues: record || {},
        });
    }

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'fob/add',
            payload: {
                ...fields,
            }
        })
        message.success('FOB успешно добавлен')
        this.handleModalVisible();
    };

    handleUpdate = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'fob/update',
            payload: {
                ...fields,
            }
        })
        message.success('FOB успешно обновлен')
        this.handleModalVisible();
    };

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'fob/remove',
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
            type: 'fob/fetch',
            payload: params,
        });
    }

    render() {
        const {
            fob: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, modalTitle, formValues } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleUpdate: this.handleUpdate,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderWrapper title="FOB">
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

export default connect(({ fob, loading }) => ({
    fob,
    loading: loading.models.fob
}))(FOBTable)