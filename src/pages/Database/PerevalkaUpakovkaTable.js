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
        modalTitle: 'Добавить perevalka_upakovka',
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
                        label="perevalka_rub"
                        name="perevalka_rub"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'perevalka_rub'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                    {...formLayout}
                        label="perevalka_dollar"
                        name="perevalka_dollar"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'perevalka_dollar'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        {...formLayout}
                        label="upakovka_rub"
                        name="upakovka_rub"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'upakovka_rub'",
                            },
                        ]}
                    >
                        <Input />
                    </FormItem>
                    <FormItem 
                        {...formLayout}
                        label="upakovka_dollar"
                        name="upakovka_dollar"
                        hasFeedback
                        rules={[
                            {
                            required: true,
                            message: "Необходимо указать 'upakovka_dollar'",
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

class PerevalkaUpakovkaTable extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
    };

    columns = [
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
            title: 'perevalka_rub',
            dataIndex: 'perevalka_rub',
            sorter: true,
        },
        {
            title: 'perevalka_dollar',
            dataIndex: 'perevalka_dollar',
            sorter: true,
        },
        {
            title: 'upakovka_rub',
            dataIndex: 'upakovka_rub',
            sorter: true,
        },
        {
            title: 'upakovka_dollar',
            dataIndex: 'upakovka_dollar',
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
            modalTitle: "Добавить perevalka_upakovka",
            formValues: {},
        });
    };

    handleUpdateModalVisible = (visible, record) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: "Изменить perevalka_upakovka",
            formValues: record || {},
        });
    }

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'perevalka_upakovka/add',
            payload: {
                ...fields,
            }
        })
        message.success('perevalka_upakovka успешно добавлен')
        this.handleModalVisible();
    };

    handleUpdate = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: 'perevalka_upakovka/update',
            payload: {
                ...fields,
            }
        })
        message.success('perevalka_upakovka успешно обновлен')
        this.handleModalVisible();
    };

    handleRemove = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        
        if (selectedRows.length === 0)
            return;

        dispatch({
            type: 'perevalka_upakovka/remove',
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
            type: 'perevalka_upakovka/fetch',
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
            type: 'perevalka_upakovka/fetch',
            payload: params,
        });
    }

    render() {
        const {
            perevalka_upakovka: { data },
            loading,
        } = this.props;
        const { selectedRows, modalVisible, modalTitle, formValues } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleUpdate: this.handleUpdate,
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderWrapper title="perevalka_upakovka">
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

export default connect(({ perevalka_upakovka, loading }) => ({
    perevalka_upakovka,
    loading: loading.models.perevalka_upakovka
}))(PerevalkaUpakovkaTable)