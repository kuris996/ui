import React, { PureComponent } from 'react'
import { connect } from 'dva'

class LogoutPage extends PureComponent { 
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'login/logout',
        })
    }
    render() {
        return(
            <></>
        )
    }
}

export default connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/logout'],
}))(LogoutPage)
