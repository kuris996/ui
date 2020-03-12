import React, { PureComponent } from 'react';
import { 
    Card,
    Button,
    Form,
    Icon,
    Col,
    Row,
    DatePicker,
    TimePicker,
    Input,
    InputNumber,
    Select,
    Popover, 
    Upload
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './TaskForm.less'
import Dragger from 'antd/lib/upload/Dragger';

const { Option } = Select;

const fieldLabels = {
    calculationType: "Расчет:",
    delta: "Значение дельты:",
    startPrice: "Стартовая цена:",
    periodCount: "Количество периодов:",
    storageCost: "Стоимость хранения на складе:",
    warehouseAvailabilityRadius: "Радиус доступности клиента до склада:",
    intialPrice: "Начальная цена:",
    warehouseMinimumRadius: "Минимальный радиус до склада:",
    customersDistance: "Расстояние между клиентами:",
    sigmaRatio: "Коэффициент сигма:",
    warehouseMaximumRadius: "Максимальный радиус до склада:",
    shippingRage: "Коэффициент перевозки:",
    clientsCalculation: "Рсчёт клиентов:",
    clients: "Клиенты:",
    warehouseOptimization: "Оптимизация складов:"
}

class TaskForm extends PureComponent {
    render() {
        return (
            <PageHeaderWrapper
                title="Задача"
            >
                <Card className={styles.card} bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.calculationType} rules={[{ required: true }]}>
                                    <Select placeholder="Выберите тип расчета">
                                        <Option value="1">Ценовые войны</Option>
                                        <Option value="2">Коалиции</Option>
                                        <Option value="3">Оптимизация с учётом складов и коалиций</Option>
                                        <Option value="4">Оптимизация с учётом складов</Option>
                                        <Option value="5">Оптимизация</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.delta} rules={[{ required: true }]}>
                                    <Input placeholder="" prefix="$" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.startPrice} rules={[{ required: true }]}>
                                    <Input placeholder="" prefix="$"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item rules={[{ required: true }]}>
                                    <Dragger multiple={false}>
                                        <Button type="dashed" className={styles.uploadButton}>
                                            <InboxOutlined style={{fontSize: '28px'}} /> 
                                            <p>Кликните или перетащите файл</p>
                                        </Button>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className={styles.card} bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.periodCount} rules={[{ required: true }]}>
                                    <Input placeholder="" suffix="месяцы"/>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item label={fieldLabels.storageCost} rules={[{ required: true }]}>
                                    <Input placeholder="" prefix="$" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={12} sm={24}>
                                <Form.Item label={fieldLabels.warehouseAvailabilityRadius} rules={[{ required: true }]}>
                                    <Input placeholder="" suffix="км."/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.intialPrice} rules={[{ required: true }]}>
                                    <Input placeholder="" prefix="$" />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.warehouseMinimumRadius} rules={[{ required: true }]}>
                                    <Input placeholder="" suffix="км." />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.customersDistance} rules={[{ required: true }]}>
                                    <Input placeholder="" suffix="км."/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.sigmaRatio} rules={[{ required: true }]}>
                                    <Input placeholder=""  suffix="км." />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.warehouseMaximumRadius} rules={[{ required: true }]}>
                                    <Input placeholder=""  suffix="км." />
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.shippingRage} rules={[{ required: true }]}>
                                    <Input placeholder="" prefix="$"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className={styles.card} bordered={false}>
                    <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                            <Col xl={6} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.clientsCalculation} rules={[{ required: true }]}>
                                    <Dragger multiple={false}>
                                        <Button type="dashed" className={styles.uploadButton}>
                                            <InboxOutlined style={{fontSize: '28px'}} /> 
                                            <p>Кликните или перетащите файл</p>
                                        </Button>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.clients} rules={[{ required: true }]}>
                                    <Dragger multiple={false}>
                                        <Button type="dashed" className={styles.uploadButton}>
                                            <InboxOutlined style={{fontSize: '28px'}} /> 
                                            <p>Кликните или перетащите файл</p>
                                        </Button>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={8} md={12} sm={24}>
                                <Form.Item label={fieldLabels.warehouseOptimization} rules={[{ required: true }]}>
                                    <Dragger multiple={false}>
                                        <Button type="dashed" className={styles.uploadButton}>
                                            <InboxOutlined style={{fontSize: '28px'}} /> 
                                            <p>Кликните или перетащите файл</p>
                                        </Button>
                                    </Dragger>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default connect()(TaskForm);
