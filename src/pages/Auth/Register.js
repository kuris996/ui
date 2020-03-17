import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Modal, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

class Register extends Component {

    render() {
        return (
            <div className={styles.main}>
                <h3>
                    Регистрация
                </h3>
                <Form>
                    <FormItem>
                        <Input size="large" placeholder="Email" />
                    </FormItem>
                    <FormItem>
                        <Input size="large" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                        <Input size="large" placeholder="Confirm password" />
                    </FormItem>
                    <FormItem>
                        <Button
                            size="large"
                            className={styles.submit}
                            type="primary"
                            htmlType="submit"
                        >
                            Зарегистрироваться
                        </Button>
                        <Link className={styles.login} to="/User/Login">
                            Уже есть аккаунт?
                        </Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Register;