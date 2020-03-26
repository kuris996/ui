import React, { PureComponent } from 'react'
import moment from 'moment';
import { connect } from 'dva'
import {
    List,
    Card,
    Progress,
    Button,
    Dropdown,
    Menu,
} from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import styles from './TaskList.less'
import Redirect from 'umi/redirect';

class TaskList extends PureComponent {
    state = { visible: false, done: false }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/fetch',
        });
    }

    render() {
        const {
            task: { task },
            loading,
        } = this.props

        const { visible, done, current ={} } = this.state;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };

        const ListContent = ({ data: { createdAt, startedAt, finishedAt, percent, status } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>Добавлен</span>
                    <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>Начало</span>
                    <p>{moment(startedAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>Окончание</span>
                    <p>{moment(finishedAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
                </div>
                <div className={styles.listContentItem}>
                    <span>Статус</span>
        <           p>{status}</p>
                </div>
            </div>
        );

        return (
            <PageHeaderWrapper title="Расчеты" >
                <div className={styles.standardList}>
                    <Card
                        className={styles.listCard}
                        bordered={false}
                        title="Список"
                        style={{ marginTop: 24 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                    >
                        <Button
                            type="dashed"
                            style={{ width: '100%', marginBottom: 8 }}
                            icon={<PlusOutlined/>}
                            href="task-form"
                        >
                            Добавить
                        </Button>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            dataSource={task}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        style={{ fontWeight: 900 }}
                                        title={<p>{item.product}</p>}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ task, loading }) => ({
    task,
    loading: loading.models.task
}))(TaskList);