import React from 'react'
import { Popover } from 'antd';
import './index.less'
export default class Head extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        let content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        return <div className="header">
            <div className="header_nav clearfix">
                {/* <p >问卷调查系统</p> */}
                <ul className="header-list clearfix">
                    <li>
                        <a href="#/home">我的项目</a>
                    </li>
                    <li>
                        <a href="#/publish">我的模版</a>
                    </li>
                </ul>
            </div>
            <Popover placement="bottomLeft" title="用户名" content={content}>
                <div className="user-avator">
                    <a href="#/member" className="user-head-logo-div ">
                        <div className="user-avator-logo"> </div>
                    </a>
                </div>
            </Popover>
        </div>

    }
}