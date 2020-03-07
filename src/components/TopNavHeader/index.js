import React, { PureComponent } from 'react';
import styles from './index.less'

export default class TopNavHeader extends PureComponent {
    state = {
        maxWidth: undefined
    }

    render() {
        return (
            <div className={`${styles.head} ${styles.light}`}></div>
        );
    }
}