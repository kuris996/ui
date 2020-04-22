import React, { PureComponent } from 'react';
import { 
    Card,
    Button,
    Form,
    Col,
    Row,
    message,
    Upload,
    Input,
    Radio
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'
import uuid from 'react-uuid'
import { bucketUrl } from '../../defaultSettings'
const { Dragger } = Upload;

const fieldLabels = {
    name: "Название:",
    inputs: "Вводные:",
}

function getInputsPath(uuid) {
    return `data/Inputs/${uuid}/Input_inputs/Excels/`
}

function getOutputsPath(uuid) {
    return `data/Inputs/${uuid}/Input_outputs/`
}

class DraggerWrapper extends PureComponent {
    state = { currentFile: "" }
    render() {
        const { children, uuid, type } = this.props
        const props = {
            action: bucketUrl,
            data: { 
                "key": this.state.currentFile,
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} успешно загружен.`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} ошибка загрузки.`);
                }
            },
            beforeUpload: file => {
                this.setState(state => ({
                    currentFile: type === 1 ? getInputsPath(uuid) + file.name :
                                 type === 2 ? getOutputsPath(uuid) + file.name : ""
                }));
                return true;
            },
        }

        return (
            <Dragger {...props}>
                {children}
            </Dragger>
        )
    }
}

class KitForm extends PureComponent {
    formRef = React.createRef();

    state = {
        uuid: uuid(),
        type: 1
    }

    validate = () => {
        const { dispatch } = this.props;
        const { uuid } = this.state;
        this.formRef.current.validateFields()
        .then(fields => {
            this.formRef.current.resetFields();
            dispatch({
                type: 'kit/submit',
                payload: { ...fields, uuid }
            })
        })
        .catch(errorInfo => {
        })
    }

    typeChange = e => {
        this.setState({
            type: e.target.value
        })
    }

    render() {
        const { submitting } = this.props;
        const { uuid, type } = this.state;
        return (
            <PageHeaderWrapper
                title="Новый Набор"
                wrapperClassName={styles.form}
            >
                <Form ref={this.formRef} layout="vertical" 
                        initialValues={{
                            type : 1
                        }}
                    >
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16} >
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 12 }} sm={{ span: 18 }} xs={{ span: 24 }}>
                                <Form.Item name="name" label={fieldLabels.name} rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card className={styles.card} bordered={false} style={{ marginTop: 24 }}>
                        <Row gutter={16}>
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 12 }} sm={{ span: 18 }} xs={{ span: 24 }}>
                                <Form.Item name="type" rules={[{ required: true }]}>
                                    <Radio.Group onChange={this.typeChange} value={this.state.type}>
                                        <Radio value={1}>Сгенерировать Модели</Radio>
                                        <Radio value={2}>Готовые Модели</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 12 }} sm={{ span: 18 }} xs={{ span: 24 }}>
                                <Form.Item name="inputs" label={fieldLabels.inputs} rules={[{ required: false }]}>
                                    <DraggerWrapper uuid={uuid} type={type}>
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-hint">
                                            Кликните или перетащите файл в область
                                        </p>
                                    </DraggerWrapper>
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
    submitting: loading.effects['kit/submit'],
}))(KitForm)