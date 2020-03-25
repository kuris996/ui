import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import DocumentTitle from 'react-document-title'
import { CopyrightOutlined } from '@ant-design/icons';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less'

const copyright = (
    <Fragment>
      Copyright <CopyrightOutlined /> SomeDudes, LLC
    </Fragment>
  );

class UserLayout extends Component {
    componentDidMount() {

    }

    render() {
        const {
            children,
            location: { pathname },
            breadcrumbNameMap,
        } = this.props;
        return (
            <DocumentTitle title="User">
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <span className={styles.title}>Ui</span>
                                </Link>
                            </div>
                            <div className={styles.desc}>Здесь какое-то интересное описание.</div>
                        </div>
                        {children}
                    </div>
                    <GlobalFooter copyright={copyright} />
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(({ menu: menuModel }) => ({
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);