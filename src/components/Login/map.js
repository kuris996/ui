import React from 'react';
import styles from './index.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default {
    UserName: {
        props: {
            size: 'large',
            id: 'userName',
            prefix: <UserOutlined className={styles.prefixIcon} />,
            placeholder: 'admin',
        },
        rules: [
            {
                required: true,
                message: 'Please enter username!',
            },
        ],
    },
    Password: {
        props: {
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
            type: 'password',
            id: 'password',
            placeholder: '888888',
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!',
            },
        ],
    },
}