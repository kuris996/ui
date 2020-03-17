import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd'
import styles from './index.less'
import ItemMap from './map'
import LoginContext from './loginContext'

const FormItem = Form.Item;

class WrapFormItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    render() {
        const { count } = this.state;

        const {
            customprops,
            defaultValue,
            rules,
            name,
            type,
            ...restProps
        } = this.props;

        const otherProps = restProps || {};
        return (
            <FormItem>
                <Input {...customprops} {...otherProps} />
            </FormItem>
        )
    }
}

const LoginItem = {};
Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];
    LoginItem[key] = props => (
        <LoginContext.Consumer>
            {context => (
                <WrapFormItem
                    customprops={item.props}
                    rules={item.rules}
                    {...props}
                    type={key}
                    form={context.form}
                />
            )}
        </LoginContext.Consumer>
    );
});

export default LoginItem;