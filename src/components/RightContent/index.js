import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
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