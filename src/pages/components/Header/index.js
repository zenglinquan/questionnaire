import React from 'react'
import { Popover } from 'antd';

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
            <div className="header_nav">
                {/* <ul>
                <li>
                    <a href="#/publish">我的发布</a>
                </li>
            </ul> */}
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