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

const { Dragger } = Upload;

const fieldLabels = {
    name: "Название:",
    inputs: "Инпуты:",
}

class DraggerWrapper extends PureComponent {
    state = { fileList: [] }
    render() {
        const { fileList } = this.state
        const { children } = this.props
        const props = {
            customRequest: _file => {
                const formData = new FormData();

                const { file } = _file

                formData.append('key', file.name)
                formData.append('file', file);
                
                reqwest({
                    url: 'https://storage.yandexcloud.net/ui-test',
                    method: 'POST',
                    processData: false,
                    data: formData,
                    success: () => {
                        message.success('upload successfully.');
                    },
                    error: () => {
                        message.error('upload failed.');
                    },
                });
            },
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return true;
            },
            fileList,
        };

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
        return (
            <PageHeaderWrapper
                title="Набор"
                wrapperClassName={styles.form}
            >
                <Form ref={this.formRef} layout="vertical" >
                    <Card className={styles.card} bordered={false}>
                        <Row gutter={16} >
                            <Col xl={{ span: 6, offset: 1 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <Form.Item name="name" label={fieldLabels.name} rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    <Card className={styles.card} bordered={false} style={{ marginTop: 24 }}>
                        <Row gutter={16} >
                            <Col xl={{ span: 6, offset: 1 }} lg={{ span: 8 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <Form.Item name="inputs" label={fieldLabels.inputs} rules={[{ required: true }]}>
                                    <DraggerWrapper>
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