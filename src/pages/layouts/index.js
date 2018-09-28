import React from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import withRouter from 'umi/withRouter';
import App from './app';
import 'moment/locale/zh-cn';

export default withRouter((props) => (
    <LocaleProvider locale={zhCN}>
        <App>
            {props.children}
        </App>
    </LocaleProvider>
));
