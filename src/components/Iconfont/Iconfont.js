import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './iconfont.less';

const Iconfont = ({ type, className, style }) => (
    <svg style={style} className={classnames('colorful-icon', className)} aria-hidden="true">
        <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
    </svg>
);

Iconfont.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Iconfont;
