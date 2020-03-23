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
import { PlusOutlined } from '@ant-design/icons';
import styles from './Table.less';

const FormItem = Form.Item;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = props => {
    const { modalVisible, modalTitle, handleAdd, handleModalVisible } = props;
    const [form] = Form.useForm();
    const okHandle = () => {
        form.validateFields()
        .then(values => {
            form.resetFields();
        })
        .catch(errorInfo => {
        })
    };
    return (
        <Modal
            destroyOnClose
            title={modalTitle}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <Form form={form}>
                <FormItem
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Год"
                    name="year"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'год'",
                        },
                    ]}
                >
                    <InputNumber />
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Месяц"
                    name="month"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'месяц'",
                        },
                    ]}
                >
                    <InputNumber />
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Продукт"
                    name="product"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'продукт'",
                        },
                    ]}
                >
                    <Input />
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Продавец"
                    name="seller"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'продавца'",
                        },
                    ]}
                >
                    <Input />
                </FormItem>
                <FormItem
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Цена"
                    name="foreignPrice"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'цену'",
                        },
                    ]}
                >
                    <InputNumber />
                </FormItem>
                <FormItem 
                    labelCol={{ span: 5 }} 
                    wrapperCol={{ span: 15 }} 
                    label="Расходы"
                    name="foreignCosts"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: "Необходимо указать 'расходы'",
                        },
                    ]}
                >
                    <InputNumber />
                </FormItem>
            </Form>
        </Modal>
    )
};

class FOBTable extends PureComponent {
    state = {
        modalVisible: false,
        selectedRows: [],
    };

    columns = [
        {
            title: 'Год',
            dataIndex: 'year',
            sorter: true,
            render: (text, row) => <span>{text + '/' + row.month}</span>
        },
        {
            title: 'Продукт',
            dataIndex: 'product',
            sorter: true,
        },
        {
            title: 'Продавец',
            dataIndex: 'seller',
            sorter: true,
        },
        {
            title: 'Цена',
            dataIndex: 'foreign_price',
            sorter: true,
        },
        {
            title: 'Расходы',
            dataIndex: 'foreign_costs',
            sorter: true,
        },
        {
            render: (text, record) => (
                <Fragment>
                  <a onClick={() => this.handleModalVisible(true, "Изменить FOB") }>Изменить</a>
                </Fragment>
            ),
        }
    ];

    handleModalVisible = (visible, title) => {
        this.setState({
            modalVisible: !!visible,
            modalTitle: title
        });
    };

    handleAdd = fields => {
        this.handleModalVisible();
    };

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
            params.sorter = `${sorter.field}_${sorter.order}`;
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
        const { selectedRows, modalVisible, modalTitle } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
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
                                onClick={() => this.handleModalVisible(true, "Добавить FOB")}
                            >
                                Добавить
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                <Button>Удалить</Button>
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
                <CreateForm {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} />
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ fob, loading }) => ({
    fob,
    loading: loading.models.fob
}))(FOBTable)