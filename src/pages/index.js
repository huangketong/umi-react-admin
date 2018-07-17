/**
 * umi中，当pathname为 '/'是加载
 * ***/
import React from 'react';
import Redirect from 'umi/redirect';

export default () => <Redirect to="/dashboard" />
;
