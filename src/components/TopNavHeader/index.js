import React, { PureComponent } from 'react';
import Link from 'umi/link'
import RightContent from '../RightContent'
import styles from './index.less'

export default class TopNavHeader extends PureComponent {
    state = {
        maxWidth: undefined
    }

    static getDerivedStateFromProps(props) {
        return {
            maxWidth: 
                (window.innerWidth > 1200 ? 1200 : window.innerWidth) -
                280 -
                120 -
                40,
        };
    }

    render() {
        const { menuData } = this.props;
        const { maxWidth } = this.state;
        return (
            <div className={`${styles.head} ${styles.light}`}>
                <div
                    ref={ref => {
                        this.maim = ref;
                    }}
                    className={`${styles.main} ${styles.wide}`}
                >
                    <div className={styles.left}>
                        <div className={styles.logo} key="logo" id="logo">
                            <Link to="/">
                                <h1>Ui</h1>
                            </Link>
                        </div>
                        <div
                            style={{
                                maxWidth,
                            }}
                        >
                        </div>
                    </div>
                    <RightContent {...this.props} />
                </div>
            </div>
        );
    }
}