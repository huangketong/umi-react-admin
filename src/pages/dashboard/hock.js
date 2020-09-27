import React, { useState, memo } from "react";

function HockDemo(props) {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
    const { text } = props;
    console.log('HockDemo')
    return (
        <div>
            <p>{text}</p>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

export default memo(HockDemo)
