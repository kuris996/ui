import React, { PureComponent } from 'react';

import { 
    Card,
    Button,
    Form,
    Col,
    Row,
    Input,
    Checkbox,
    InputNumber
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import styles from './styles.less'

class KitForm extends PureComponent {
    state = {
        width: '100%'
    };

    render() {
        return (
            <div>Hello World</div>
        )
    }
}

export default KitForm