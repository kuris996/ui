import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'dva'
import {
    List,
    Row,
    Col,
    Radio,
    Input,
    Progress,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
    Modal,
    Form,
    DatePicker,
    Select
} from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'

import styles from './TaskList.less'

class TaskList extends PureComponent {
    state = {}

    componentDidMount() {
    }

    render() {
        return (
            <PageHeaderWrapper title="Список Задач">
                Hello World!
            </PageHeaderWrapper>
        )
    }
}

export default TaskList;