import React, { PureComponent } from 'react';
import { 
    Card,
    Button,
    Form,
    Col,
    Row,
    message,
    Upload,
    Input
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'
import reqwest from 'reqwest';
import uuid from 'react-uuid'
import { bucketUrl } from '../../defaultSettings'
import { getInputsPath } from '@/utils/paths'

const { Dragger } = Upload;

const fieldLabels = {
    name: "Название:",
    inputs: "Вводные:",
}

class DraggerWrapper extends PureComponent {
    state = { currentFile: "" }
    render() {
        const { children, uuid } = this.props
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
                    currentFile: getInputsPath(uuid) + file.name
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
        uuid: uuid()
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

    render() {
        const { submitting } = this.props;
        const { uuid } = this.state;
        return (
            <PageHeaderWrapper
                title="Набор"
                wrapperClassName={styles.form}
            >
                <Form ref={this.formRef} layout="vertical" >
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
                        <Row gutter={16} >
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 12 }} sm={{ span: 18 }} xs={{ span: 24 }}>
                                <Form.Item name="inputs" label={fieldLabels.inputs} rules={[{ required: false }]}>
                                    <DraggerWrapper uuid={uuid}>
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