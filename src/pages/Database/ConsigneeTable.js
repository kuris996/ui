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
        modalTitle: 'Добавить Consignee',
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
                        label="consignee"
                        name="consignee"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'consignee'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        {...formLayout}
                        
                        label="station"
                        name="station"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'station'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="region"
                        name="region"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'region'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                    {...formLayout}
                        label="holding"
                        name="holding"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'holding'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        {...formLayout}
                        label="GPS_latitude"
                        name="GPS_latitude"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'GPS_latitude'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="GPS_longitude"
                        name="GPS_longitude"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'GPS_longitude'",
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
                </Form>
            </Modal>
        )
    }
};

class ConsigneeTable extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
    };

    columns = [
        {
            title: 'consignee',
            dataIndex: 'consignee',
            sorter: true,
        },
        {
            title: 'station',
            dataIndex: 'station',
            sorter: true,
        },
        {
            title: 'region',
            dataIndex: 'region',
            sorter: true,
        },
        {
            title: 'holding',
            dataIndex: 'holding',
            sorter: true,
        },
        {
            title: 'GPS_latitude',
            dataIndex: 'GPS_latitude',
            sorter: true,
        },
        {
            title: 'GPS_longitude',
            dataIndex: 'GPS_longitude',
            sorter: true,
        },
        {
            title: 'year',
            dataIndex: 'year',
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
            modalTitle: "Добавить consignee",
            formValues: {},
        });
    };

    handleUpdateModalVisible = (visible, record) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Изменить consignee",
            formValues: record || {},
        });
    }

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'consignee/add',
            payload: {
                ...fields,
            }
        })
        message.success('consignee успешно добавлен')
        this.handleModalVisible();
    };

    handleUpdate = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'consignee/update',
            payload: {
                ...fields,
            }
        })
        message.success('consignee успешно обновлен')
        this.handleModalVisible();
    };

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'consignee/remove',
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
            type: 'consignee/fetch',
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
            type: 'consignee/fetch',
            payload: params,
        });
    }

    render() {
        const {
            consignee: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, modalTitle, formValues } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleUpdate: this.handleUpdate,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderWrapper title="consignee">
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

export default connect(({ consignee, loading }) => ({
    consignee,
    loading: loading.models.consignee
}))(ConsigneeTable)