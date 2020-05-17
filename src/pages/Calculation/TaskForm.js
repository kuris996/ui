import React, { PureComponent } from 'react';
import { 
    Card,
    Button,
    Form,
    Col,
    Row,
    Input,
    Checkbox,
    InputNumber,
    Select,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'
import uuid from 'react-uuid'

const { Option } = Select;

const fieldLabels = {
    kit: "Набор:",
    CALCULATION_TYPE_ID: "Вариант Расчета:",
    PRODUCT: "PRODUCT:",
    DELTAS_STORAGE: "DELTAS_STORAGE:",
    DELTA_RAILWAY: "DELTA_RAILWAY:",
    YEARS: "YEARS:",
    RAILWAY_INITIAL_PRICE: "RAILWAY_INITIAL_PRICE:",
    MAX_RATIO_RAILWAY: "MAX_RATIO_RAILWAY:",
    STORAGES_BUY_ON_MARKET: "STORAGES_BUY_ON_MARKET:",
    AUTO_OPEN_STORAGE: "AUTO_OPEN_STORAGE:",
    ALTERNATIVE_PREMIUM: "ALTERNATIVE_PREMIUM:",
    LOGISTIC_PREMIUM: "LOGISTIC_PREMIUM:",
    MIN_RADIUS: "MIN_RADIUS:",
    MAX_RADIUS: "MAX_RADIUS:",
    CUSTOMER_DISTANCE: "CUSTOMER_DISTANCE:",
    AVAILABILITY_RADIUS: "AVAILABILITY_RADIUS:",
    STORAGE_PRICE: "STORAGE_PRICE:",
    BALANCE_RATIO: "BALANCE_RATIO:",
    REARRANGE_HOLDINGS: "REARRANGE_HOLDINGS:",
    SHUFFLE_STORAGE: "SHUFFLE_STORAGE:",
    SHUFFLE_RAILWAY: "SHUFFLE_RAILWAY:",
    CORRECTION_FLAG: "CORRECTION_FLAG:",
    CORRECTION_CORIDOR: "CORRECTION_CORIDOR:",
    DELTA: "DELTA:",
    START_PRICE: "START_PRICE:",
}

function validateArrayOfValues(value, min, max) {
    var re = /\s*,\s*/;
    var tokens = value.split(re);
    for (let i = 0; i < tokens.length; ++i) {
        let val = parseFloat(tokens[i])
        if (isNaN(val))
            return `Неверное значение ${tokens[i]}`
        if (val < min)
            return `Значение должно быть больше ${min}`
        if (val > max)
            return `Значение должно быть меньше ${max}`
    }
    return "";
}

class TaskForm extends PureComponent {
    formRef = React.createRef();

    state = {
        uuid: uuid(),
        taskType: 1,
        PRODUCT: "",
        years: [],
        selectedYears: [],
        AUTO_OPEN_STORAGE_disabled: false,
        BALANCE_RATIO_warning: ""
    }

    validate = () => {
        const {
            dispatch,
        } = this.props;
        const {
            uuid,
            selectedYears,
            PRODUCT
        } = this.state;
        let YEARS = selectedYears
        this.formRef.current.validateFields()
        .then(fields => {
            const {
                key : kit,
                label : kitName,
             } = fields.kit
            dispatch({
                type: 'task/submit',
                payload: { ...fields, uuid, kit, kitName, YEARS, PRODUCT},
            });
        })
        .catch(errorInfo => {
        })
    };

    taskTypeChange = (e) => {
        this.setState({ taskType: e })
    }

    productChange = (e) => {
        this.setState({ PRODUCT: e.label, years: e.value, selectedYears: [] })
    }

    yearChange = (e) => {
        this.setState({ selectedYears: e})
    }

    STORAGES_BUY_ON_MARKET_Change = (e) => {
        this.formRef.current.setFieldsValue({
            AUTO_OPEN_STORAGE: false
        })

        this.setState({ AUTO_OPEN_STORAGE_disabled: !e.target.checked })
    }

    BALANCE_RATIO_Change = (e) => {
        if (e < 1.02)
            this.setState({ BALANCE_RATIO_warning: "Cлишком малый избыток предложения над спросом." })
        else
            this.setState({ BALANCE_RATIO_warning: "" })
    }

    kitChange = (e) => {
        const { dispatch } = this.props;

        this.formRef.current.setFieldsValue({
            PRODUCT: "", YEARS: []
        })

        dispatch({
            type: 'params/fetch',
            payload: { 
                kit: e.key
            }
        });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'kit/fetch',
            payload: { status: "'finished'" }
        });
    }

    render() {
        const { 
            kit : { data }, 
            kitLoading, 
            params: { list },
            paramsLoading,
            submitting 
        } = this.props;

        const {
            taskType,
            AUTO_OPEN_STORAGE_disabled,
            BALANCE_RATIO_warning
        } = this.state;

        return (
            <PageHeaderWrapper
                title="Новая Задача"
                wrapperClassName={styles.form}
            >
                <Form ref={this.formRef} layout="vertical" 
                    initialValues={{
                        CALCULATION_TYPE_ID: 1,
                        DELTA: 1,
                        START_PRICE: 500,
                        DELTAS_STORAGE: 0.5,
                        DELTA_RAILWAY: 0.5,
                        RAILWAY_INITIAL_PRICE: 500,
                        MAX_RATIO_RAILWAY: 1,
                        STORAGES_BUY_ON_MARKET: true,
                        AUTO_OPEN_STORAGE: false,
                        ALTERNATIVE_PREMIUM: 1200,
                        LOGISTIC_PREMIUM: 0,
                        MIN_RADIUS: 2,
                        MAX_RADIUS: 2,
                        CUSTOMER_DISTANCE: 1.8,
                        AVAILABILITY_RADIUS: 400,
                        STORAGE_PRICE: 1000000,
                        BALANCE_RATIO: 1.02,
                        REARRANGE_HOLDINGS: false,
                        SHUFFLE_STORAGE: false,
                        SHUFFLE_RAILWAY: false,
                        CORRECTION_FLAG: false,
                        CORRECTION_CORIDOR: "0.075, 0.068, 0.054, 0.056, 0.08, 0.072, 0.067, 0.054, 0.058, 0.062, 0.061, 0.063",
                    }}
                >
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16} >
                            <Col xl={6} lg={12} md={{ span: 12 }} sm={{ span: 24 }} xs={12}>
                                <Form.Item name="CALCULATION_TYPE_ID" label={fieldLabels.CALCULATION_TYPE_ID} rules={[{ required: true }]}>
                                    <Select onChange={this.taskTypeChange}>
                                        <Option key={1} value={1}>
                                        Простая оптимизация
                                        </Option>
                                        <Option key={2} value={2}>
                                        Оптимизация со складами
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col xl={6} lg={12} md={{ span: 12 }} sm={{ span: 24 }} xs={12}>
                                <Form.Item name="kit" label={fieldLabels.kit} rules={[{ required: true }]}>
                                    <Select loading={kitLoading} labelInValue onChange={this.kitChange} >
                                        { data.list.map(kit => (
                                            <Option key={kit.uuid} value={kit.uuid}>
                                                {kit.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        { taskType === 2 &&
                        <Row gutter={16}>
                            <Col xl={{ span: 6 }} lg={12} md={12} sm={24} xs={12}>
                                <Form.Item name="PRODUCT" label={fieldLabels.PRODUCT} rules={[{ required: true }]}>
                                    <Select loading={paramsLoading} labelInValue onChange={this.productChange}>
                                        { list.map(prod => (
                                            <Option key={prod.product} value={prod.years}>
                                                {prod.product}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={12} md={12} sm={24} xs={12}>
                                <Form.Item name="YEARS" label={fieldLabels.YEARS} rules={[{ required: true }]}>
                                    <Select loading={paramsLoading} mode="multiple" onChange={this.yearChange}>
                                        { this.state.years.map(year => (
                                            <Option key={year}  value={year}>
                                                {year}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        }
                    </Card>
                    { taskType === 1 &&
                    <>
                    <Card className={styles.card} bordered={false} style={{ marginTop: 24 }}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="DELTA" label={fieldLabels.DELTA} rules={[{ required: true }]}>
                                    <InputNumber placeholder="" min={0.01}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="START_PRICE" label={fieldLabels.START_PRICE} rules={[{ required: true }]}>
                                    <InputNumber placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="REARRANGE_HOLDINGS" label={fieldLabels.REARRANGE_HOLDINGS}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    </>
                    }

                    { taskType === 2 &&
                    <>
                    <Card className={styles.card} bordered={false} style={{ marginTop: 24 }}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="DELTAS_STORAGE" 
                                           label={fieldLabels.DELTAS_STORAGE} 
                                           rules={[ { required: true } ]}
                                >
                                    <InputNumber placeholder="" min={0.01}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="DELTA_RAILWAY" 
                                           label={fieldLabels.DELTA_RAILWAY} 
                                           rules={[ { required: true } ]}
                                >
                                    <InputNumber placeholder=""  min={0.01}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="RAILWAY_INITIAL_PRICE" 
                                           label={fieldLabels.RAILWAY_INITIAL_PRICE}
                                           rules={[{ required: true }]}
                                >
                                    <InputNumber placeholder="" 
                                                 min={0}
                                                 formatter={value => `$ ${value}` }
                                                 parser={value => value.replace('$ ', '')}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="MAX_RATIO_RAILWAY" 
                                            label={fieldLabels.MAX_RATIO_RAILWAY} 
                                            rules={[
                                                { required: true },
                                                ({ getFieldValue }) => ({
                                                 validator(rule, value) {
                                                    if (value > 0) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('Значение должно быть больше 0');
                                                 },
                                               })
                                             ]}
                                >
                                    <InputNumber placeholder="" max={1} min={0} />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="STORAGES_BUY_ON_MARKET" 
                                    label={fieldLabels.STORAGES_BUY_ON_MARKET}
                                    onChange={this.STORAGES_BUY_ON_MARKET_Change}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="ALTERNATIVE_PREMIUM" label={fieldLabels.ALTERNATIVE_PREMIUM} 
                                        rules={[{ required: true }]}>
                                    <InputNumber placeholder="" 
                                                 min={0} 
                                                 formatter={value => `₽ ${value}` }
                                                 parser={value => value.replace('₽ ', '')} />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="LOGISTIC_PREMIUM" 
                                        label={fieldLabels.LOGISTIC_PREMIUM} 
                                        rules={[{ required: true }]}>
                                    <InputNumber placeholder="" 
                                                 min={0} 
                                                 formatter={value => `₽ ${value}` }
                                                 parser={value => value.replace('₽ ', '')}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="AUTO_OPEN_STORAGE" 
                                        label={fieldLabels.AUTO_OPEN_STORAGE} 
                                        valuePropName="checked"
                                >
                                    <Checkbox disabled={AUTO_OPEN_STORAGE_disabled}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>    
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="MIN_RADIUS" 
                                    label={fieldLabels.MIN_RADIUS} 
                                    rules={[
                                        { required: true },
                                        ({ getFieldValue }) => ({
                                         validator(rule, value) {                                           
                                           if (value > 0) {
                                             return Promise.resolve();
                                           }
                                           return Promise.reject('Значение должно быть больше 0');
                                         },
                                       })
                                     ]}
                                >
                                    <InputNumber placeholder="" min={0}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="MAX_RADIUS" 
                                    label={fieldLabels.MAX_RADIUS} 
                                    dependencies={['MIN_RADIUS', 'CUSTOMER_DISTANCE']}
                                    rules={[
                                        { required: true },
                                        ({ getFieldValue }) => ({
                                         validator(rule, value) {
                                           if ((value * value * Math.PI)  / getFieldValue('CUSTOMER_DISTANCE') > 20)
                                             return Promise.reject('Увеличьте значение CUSTOMER_DISTANCE или уменьшите MAX_RADIUS');
                                           if (value >= getFieldValue('MIN_RADIUS')) {
                                             return Promise.resolve();
                                           }                                           
                                           return Promise.reject('Значение должно быть больше или равно MIN_RADIUS');
                                         },
                                       })
                                     ]}
                                >
                                    <InputNumber placeholder="" min={0} />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="CUSTOMER_DISTANCE" 
                                        label={fieldLabels.CUSTOMER_DISTANCE}
                                        dependencies={['MAX_RADIUS']}
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                             validator(rule, value) {    
                                               if ((getFieldValue('MAX_RADIUS') * getFieldValue('MAX_RADIUS') * Math.PI)  / value > 20)
                                                 return Promise.reject('Увеличьте значение CUSTOMER_DISTANCE или уменьшите MAX_RADIUS');                                       
                                               if (value > 0) {
                                                 return Promise.resolve();
                                               }
                                               return Promise.reject('Значение должно быть больше 0');
                                             },
                                           })
                                         ]}
                                        >
                                    <InputNumber placeholder="" min={0} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="AVAILABILITY_RADIUS" 
                                        label={fieldLabels.AVAILABILITY_RADIUS} 
                                        dependencies={['MAX_RADIUS']}
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (value >= getFieldValue('MAX_RADIUS')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Значение должно быть больше или равно MAX_RADIUS');
                                            },
                                        })
                                        ]}
                                >
                                    <InputNumber placeholder="" min={0}/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="STORAGE_PRICE"
                                        label={fieldLabels.STORAGE_PRICE}
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (value > 0) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Значение должно быть больше 0');
                                            },
                                        })
                                        ]}
                                >
                                    <InputNumber placeholder="" min={0}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="BALANCE_RATIO"
                                         label={fieldLabels.BALANCE_RATIO}
                                         rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                            if (value > 0) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Значение должно быть больше 0');
                                            },
                                        })
                                        ]}
                                    help={BALANCE_RATIO_warning}
                                    validateStatus={BALANCE_RATIO_warning ? "warning" : "success"}
                                >
                                    <InputNumber placeholder="" min={0} onChange={this.BALANCE_RATIO_Change}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="REARRANGE_HOLDINGS" label={fieldLabels.REARRANGE_HOLDINGS}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="SHUFFLE_STORAGE" label={fieldLabels.SHUFFLE_STORAGE}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="SHUFFLE_RAILWAY" label={fieldLabels.SHUFFLE_RAILWAY}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="CORRECTION_FLAG" label={fieldLabels.CORRECTION_FLAG}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 14, offset: 2 }} lg={{ span: 14 }} md={12} sm={24} xs={24}>
                                <Form.Item name="CORRECTION_CORIDOR" 
                                        label={fieldLabels.CORRECTION_CORIDOR} 
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                             validator(rule, value) {
                                               let err = validateArrayOfValues(value, 0)
                                               if (err === "") {
                                                 return Promise.resolve();
                                               }
                                               return Promise.reject(err);
                                             },
                                           })
                                         ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    </>
                    }
                    <FooterToolbar>
                        <Button type="primary" onClick={this.validate} loading={submitting}>
                            Создать
                        </Button>
                    </FooterToolbar>
                </Form>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({kit, params, loading }) => ({
    kit,
    kitLoading: loading.models.kit,
    params,
    paramsLoading: loading.models.params,
    submitting: loading.effects['task/submit'],
}))(TaskForm);

