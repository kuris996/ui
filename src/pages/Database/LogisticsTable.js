import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'

import { Form, Input, Button, Checkbox, Modal } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CreateForm = props => {
    const [form] = Form.useForm();
    const okHandle = () => {
        form.validateFields()
        .then(values => {
            console.log(values)
        })
        .catch(errorInfo => {
            console.log(errorInfo)
        })
    };
    return (
        <Modal visible={true}
            onOk={okHandle}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

class LogisticsTable extends PureComponent {
    render() {
        return (
            <CreateForm/>
        )
    }
}

export default connect(({ }) => ({
}))(LogisticsTable)