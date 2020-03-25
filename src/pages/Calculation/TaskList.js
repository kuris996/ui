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

class TaskList extends PureComponent {
    state = { visible: false, done: false }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/fetch',
            payload: {
                count: 5,
            },
        });
    }

    render() {
        const {
            task: { task },
            loading,
        } = this.props

        const { visible, done, current ={} } = this.state;

        const editAndDelete = (key, currentItem) => {
            
        };

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5
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
            </div>
        );

        const ActionMenu = props => (
            <Dropdown
              overlay={
                <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
                  <Menu.Item key="edit">Изменить</Menu.Item>
                  <Menu.Item key="delete">Удалить</Menu.Item>
                </Menu>
              }
            >
              <a>
                Действие <DownOutlined />
              </a>
            </Dropdown>
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
                        >
                            Добавить
                        </Button>
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={task}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <ActionMenu current={item} />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        style={{ fontWeight: 900 }}
                                        title={<p>{item.calculationType}</p>}
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