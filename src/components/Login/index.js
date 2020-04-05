import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Tabs } from 'antd'
import classNames from 'classnames'
import LoginSubmit from './LoginSubmit'
import LoginItem from './LoginItem'
import styles from './index.less'

class Login extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultActiveKey: PropTypes.string,
        onSubmit: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        defaultActiveKey: '',
        onSubmit: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            type: props.defaultActiveKey,
            active: {},
        }
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        const { className, children } = this.props;
        return (
            <div className={classNames(className, styles.login)}>
                <Form>
                    {children}
                </Form>
            </div>
        );
    }
}

Login.Submit = LoginSubmit;

Object.keys(LoginItem).forEach(item => {
    Login[item] = LoginItem[item];
});

export default Login;