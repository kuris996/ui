import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import Context from './MenuContext';
import HeaderView from './HeaderView'
import styles from './BasicLayout.less';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.Component {
    componentDidMount() {

    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        }
    }

    render() {
        const {
            children,
            location: { pathname },
            isMobile,
            menuData,
            breadcrumbNameMap
        } = this.props

        const contentStyle = { paddingTop: 0 }

        const layout = (
            <Layout>
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderView
                        {...this.props}
                    />
                    <Content className={styles.content} style={contentStyle}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <React.Fragment>
                <DocumentTitle title="Hello World">
                    <ContainerQuery query={query}>
                        {params => (
                        <Context.Provider>
                            <div className={classNames(params)}>{layout}</div>
                        </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        )
    }
}

export default connect(({  }) => ({
  }))(props => (
    <Media query="(max-width: 599px)">
      {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
  ));