import React, { Component } from 'react'
import { connect } from 'dva'
import { Checkbox, Alert } from 'antd';
import Login  from '@/components/Login';
import styles from './Login.less'

const { UserName, Password, Submit } = Login;

class LoginPage extends Component {
    state = {
        autoLogin: true,
    }

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked
        })
    }

    handleSubmit = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'login/login',
            payload: {
                ...values
            }
        })
    }

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { login, submitting } = this.props;
        const { autoLogin } = this.state;
        return (
            <div className={styles.main}>
                {login.status === 'error' &&
                    !submitting &&
                    this.renderMessage("Неверный Аккаунт или Пароль")}
                <Login
                    ref={form => {
                        this.loginForm = form;
                    }}
                    onSubmit={this.handleSubmit}
                >
                    <UserName name="userName" />
                    <Password name="password" />
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            Запомнить меня
                        </Checkbox>
                    </div>
                    <Submit>
                        Войти
                    </Submit>
                    <div className={styles.other}>
                    </div>
                </Login>
            </div>
        )
    }
}

export default connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))(LoginPage)
