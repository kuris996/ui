import React, { Component } from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Modal, Icon } from 'antd';
import Login  from '@/components/Login';
import styles from './Login.less'

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
    }

    render() {
        const { type, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <Login
                >
                    <UserName />
                    <Password />
                    <div>
                        <Checkbox>
                            Запомнить меня
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            Забыли свой пароль?
                        </a>
                    </div>
                    <Submit>
                        Войти
                    </Submit>
                    <div className={styles.other}>
                        <Link className={styles.register} to="/user/register">
                            Зарегистрироваться
                        </Link>
                </div>
                </Login>
            </div>
        )
    }
}

export default connect(({}) => ({
}))(LoginPage)