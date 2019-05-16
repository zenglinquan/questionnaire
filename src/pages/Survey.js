import React from 'react';
export default class Home extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {

	}

	render() {

		return (<div className="survey">
			<div className="question_type_wrap">
				<dl>
					<dt>选择题</dt>
					<dd className="wrap">
						<label><i className="icon_type icon_type_single"></i>单选题</label>
						<label><i className="icon_type icon_type_multiple"></i>多选题</label>
						<label><i className="icon_type icon_type_image"></i>图片选择</label>
						<label><i className="icon_type icon_type_dropdown"></i>下拉题</label>
					</dd>
				</dl>
				<dl>
					<dt>填空题</dt>
					<dd className="wrap">
						<label><i className="icon_type icon_type_blank"></i>单项填空</label>
						<label><i className="icon_type icon_type_multiple_blank"></i>多想填空</label>
					</dd>
				</dl>
			</div>
			<div className="survey_main_wrap">
				<div className="question-box">
					<div className="question">
						<div className="q_content_wrap">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div className="q_operate">
							<span>复制</span>
							<span>删除</span>
						</div>
					</div>
				</div>
			</div>
			<div className="setting_main_wrap"></div>
		</div>

		)
	}
}