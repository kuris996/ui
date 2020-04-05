import React, { PureComponent } from 'react';
import { Spin} from 'antd';
import styles from './index.less';

export default class RightContent extends PureComponent {
    render() {
        let className = styles.right
        return (
            <div className={className}>
                <Spin size="small" style={{ marginLeft: 8, marginRight: 16 }} />
            </div>
        )
    }
}