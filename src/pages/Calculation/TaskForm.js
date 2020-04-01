import React, { PureComponent } from 'react';
import { 
    Card,
    Button,
    Form,
    Col,
    Row,
    Input,
    Checkbox,
    InputNumber
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'

const fieldLabels = {
    PRODUCT: "PRODUCT:",
    DELTAS_STORAGE: "DELTAS_STORAGE:",
    DELTA_RAILWAY: "DELTA_RAILWAY:",
    YEARS: "YEARS:",
    FOB_PRICES: "FOB_PRICES:",
    RAILWAY_INITIAL_PRICE: "RAILWAY_INITIAL_PRICE:",
    MAX_RATIO_RAILWAY: "MAX_RATIO_RAILWAY:",
    STORAGES_BUY_ON_MARKET: "STORAGES_BUY_ON_MARKET:",
    WH_PREMIUM_RAILWAY: "WH_PREMIUM_RAILWAY:",
    OVERALL_PREMIA_ADDITION: "OVERALL_PREMIA_ADDITION:",
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
    CORRECTION_CORIDOR: "CORRECTION_CORIDOR:"
}

class TaskForm extends PureComponent {
    formRef = React.createRef();

    validate = () => {
        const {
            dispatch,
        } = this.props;
        this.formRef.current.validateFields()
        .then(fields => {
            this.formRef.current.resetFields();
            dispatch({
                type: 'task/submit',
                payload: fields,
            });
        })
        .catch(errorInfo => {
        })
    };

    render() {
        const { submitting } = this.props;

        return (
            <PageHeaderWrapper
                title="Задача"
                wrapperClassName={styles.form}
            >
                <Form ref={this.formRef} layout="vertical" 
                    initialValues={{
                        PRODUCT : "СЕЛИТРА АММИАЧНАЯ",
                        DELTAS_STORAGE: "1, 0.5",
                        DELTA_RAILWAY: "1, 0.5",
                        YEARS: "2014, 2015, 2016, 2017, 2018, 2019",
                        FOB_PRICES: "600, 700, 740, 740, 600",
                        RAILWAY_INITIAL_PRICE: "280",
                        MAX_RATIO_RAILWAY: "1",
                        STORAGES_BUY_ON_MARKET: true,
                        WH_PREMIUM_RAILWAY: "16",
                        OVERALL_PREMIA_ADDITION: "0",
                        MIN_RADIUS: 2,
                        MAX_RADIUS: 2,
                        CUSTOMER_DISTANCE: "1.8",
                        AVAILABILITY_RADIUS: 400,
                        STORAGE_PRICE: 1000000,
                        BALANCE_RATIO: 1.02,
                        REARRANGE_HOLDINGS: false,
                        SHUFFLE_STORAGE: false,
                        SHUFFLE_RAILWAY: false,
                        CORRECTION_FLAG: false,
                        CORRECTION_CORIDOR: "0.075, 0.068, 0.054, 0.056, 0.08, 0.072, 0.067, 0.054, 0.058, 0.062, 0.061, 0.063"
                    }}
                >
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="PRODUCT" label={fieldLabels.PRODUCT} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="DELTAS_STORAGE" label={fieldLabels.DELTAS_STORAGE} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="DELTA_RAILWAY" label={fieldLabels.DELTA_RAILWAY} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="FOB_PRICES" label={fieldLabels.FOB_PRICES} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="YEARS" label={fieldLabels.YEARS} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="RAILWAY_INITIAL_PRICE" label={fieldLabels.RAILWAY_INITIAL_PRICE} rules={[{ required: true }]}>
                                    <Input placeholder=""/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="MAX_RATIO_RAILWAY" label={fieldLabels.MAX_RATIO_RAILWAY} rules={[{ required: true }]}>
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="STORAGES_BUY_ON_MARKET" label={fieldLabels.STORAGES_BUY_ON_MARKET}
                                    valuePropName="checked"
                                >
                                    <Checkbox/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="WH_PREMIUM_RAILWAY" label={fieldLabels.WH_PREMIUM_RAILWAY} rules={[{ required: true }]}>
                                    <InputNumber placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item name="OVERALL_PREMIA_ADDITION" label={fieldLabels.OVERALL_PREMIA_ADDITION} rules={[{ required: true }]}>
                                    <InputNumber placeholder=""/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="MIN_RADIUS" label={fieldLabels.MIN_RADIUS} rules={[{ required: true }]}>
                                    <InputNumber placeholder=""/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="MAX_RADIUS" label={fieldLabels.MAX_RADIUS} rules={[{ required: true }]}>
                                    <InputNumber placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="CUSTOMER_DISTANCE" label={fieldLabels.CUSTOMER_DISTANCE}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="AVAILABILITY_RADIUS" label={fieldLabels.AVAILABILITY_RADIUS} rules={[{ required: true }]}>
                                    <InputNumber placeholder="" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item name="STORAGE_PRICE" label={fieldLabels.STORAGE_PRICE}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item name="BALANCE_RATIO" label={fieldLabels.BALANCE_RATIO} rules={[{ required: true }]}>
                                    <InputNumber placeholder=""/>
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
                            <Col xl={{ span: 14, offset: 2 }} lg={{ span: 14 }} md={12} sm={24}>
                                <Form.Item name="CORRECTION_CORIDOR" label={fieldLabels.CORRECTION_CORIDOR} rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

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

export default connect(({ loading }) => ({
    submitting: loading.effects['task/submit'],
}))(TaskForm);

