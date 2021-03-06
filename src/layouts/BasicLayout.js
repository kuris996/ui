import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Media from 'react-media';
import Context from './MenuContext';
import HeaderView from './HeaderView'
import SiderMenu from '@/components/SiderMenu';
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
        const {
            dispatch,
            route: { routes, path },
        } = this.props;
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes, path},
        })
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        }
    }

    getLayoutStyle = () => {
        const{ isMobile, collapsed } = this.props;
        if (!isMobile) {
            return {
                paddingLeft: collapsed ? '80px' : '256px',
            }
        }
        return null
    }

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {
        const {
            children,
            isMobile,
            menuData,
        } = this.props

        const contentStyle = { }
        const layout = (
            <Layout>
                <SiderMenu
                    onCollapse={this.handleMenuCollapse}
                    menuData={menuData}
                    isMobile={isMobile}
                    {...this.props}
                />
                <Layout style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh' 
                    }}
                >
                    <HeaderView
                        menuData={menuData}
                        handleMenuCollapse={this.handleMenuCollapse}
                        isMobile={isMobile}
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
                <DocumentTitle title={"NH4NO3"}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>{layout}</div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        )
    }
}

export default connect(({ global, menu: menuModel }) => ({
    collapsed: global.collapsed,
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap
}))(props => (
    <Media query="(max-width: 599px)">
        {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));