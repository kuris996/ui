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
            .then(values => {
                this.formRef.current.resetFields();
                if (this.props.values && Object.keys(this.props.values).length)
                    handleUpdate()
                else
                    handleAdd();
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
                        {...formLayout}
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
                        {...formLayout}
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
                    {...formLayout}
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
                        {...formLayout}
                        label="Цена"
                        name="foreign_price"
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
                        {...formLayout}
                        label="Расходы"
                        name="foreign_costs"
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
    }
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
            title: 'Месяц',
            dataIndex: 'month',
            sorter: true,
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
        this.handleModalVisible();
    };

    handleUpdate = fields => {
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
                <CreateForm {...parentMethods} modalVisible={modalVisible} modalTitle={modalTitle} values={formValues} />
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ fob, loading }) => ({
    fob,
    loading: loading.models.fob
}))(FOBTable)