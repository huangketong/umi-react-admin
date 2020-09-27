import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import { Row, Col } from 'antd';

const Animation = () => {
  return (
    <div className={styles.wrap}>
      <Row >
        <Col span={12}>
          <div className={styles.loadingWarp}>
            <div className={styles.circle}>
              <div className={styles.loadingbg}></div>
              <div className={styles.loading}></div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.loadingWarp}>
            <div className={styles.circle}>
              <div className={styles.loadingbg2}></div>
              <div className={styles.loading2}></div>
            </div>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default Animation
