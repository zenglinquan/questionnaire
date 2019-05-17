import React from 'react';
import DragSort from './components/DragSort'
import Shake from './components/Shake'
import ContentEditable from './components/ContentEditable'
import { uuid } from '../../util/util'
import { Tooltip } from 'antd'
export default class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.editorsEl = [];
		this.scaleId = '';
		this.sign = false;
		this.questionTypes = [
			{
				name: "选择题",
				type: 0,
				value: [
					{ name: "单选题", type: "single" }, { name: "多选题", type: "multiple" }, { name: "图片选择", type: "image" }, { name: "下拉题", type: "dropdown" }
				]
			},
			{
				name: "填空题",
				type: 1,
				value: [
					{ name: "单项填空", type: "blank" }, { name: "多项填空", type: "multiple_blank" }
				]
			},
		]
		this.state = {
			editorsEl: [],
			editors: [],
			isEditor: false
		}
	}

	state = {
		editors: [],
		questionnairTitle: '问卷标题',
		curMoveItem: null,
		drag: false,
		scrollTo: 0,
		newEditor: true,
	}

	componentDidMount() {

	}

	editorsEl() {

	}

	/*
   * 判断是否有处于编辑状态的题目, activeEditorIndex // -1,没有处于编辑状态的题目
   * 如果有处于编辑状态的题目，则激活该编辑器抖动
   */
	isThereEditor = () => {
		const activeEditorIndex = this.state.editors.findIndex(data => data.isEditor === true);
		if (activeEditorIndex !== -1) {
			let editors = JSON.parse(JSON.stringify(this.state.editors));
			editors[activeEditorIndex].editorShake = uuid();
			this.setState({
				editors,
			});
			return true;
		} else {
			return false;
		};
	}

	createEditor(type) {
		if (this.isThereEditor()) {
			return;
		}
		const editor = {
			questionId: uuid(), //id
			type: type, //类型
			title: '', //题目
			required: false, //是否必填
			remark: false, //是否有备注
			remarkText: '', //备注内容
			options: ['选项', '选项'], //选项(只有radio,checkbox,select有,其余尽量给个空数组)
			rows: 1, //选项占的行数
			textareaHeight: 3, //多行文本高度
			maxLength: 50, //单行文本限制的字数
			otherOption: false, //是否有其他选项
			otherOptionForwards: '其他', //”其他“项文本(前)
			otherOptionBackwards: '', //”其他“项文本(后)
			completionForwards: '题目：', //填空题文本(前)
			completionBackwards: '', //填空题文本(后)
			isEditor: true, //编辑状态还是已编辑状态
			isFirst: true, //是否是新创建的
			editorShake: '',
		};
		this.setState(prevState => ({
			editors: [...prevState.editors, editor],
		}));
	}

	render() {
		let { questionTypes } = this
		let { editors } = this.state
		return (<div className="survey">
			<div className="question_type_wrap">
				{
					questionTypes.map((item, i) => {
						return <dl key={i}>
							<dt>{item.name}</dt>
							<dd className="wrap">
								{
									item.value.map((item, i) => {
										return <label key={i} onClick={this.createEditor.bind(this, item.type)}><i className={`icon_type icon_type_${item.type}`}></i>{item.name}</label>
									})
								}
							</dd>
						</dl>
					})
				}
			</div>
			<div className="survey_main_wrap">
				<div className="question-box">
					{
						editors.map((item, i) => {
							let { isEditor, editorShake } = item
							return isEditor ? <Shake shake={editorShake} key={i}>
								<QuestionItem key={i} isEditor={isEditor}></QuestionItem>
							</Shake> : <QuestionItem key={i} isEditor={isEditor}></QuestionItem>

						})
					}
				</div>

			</div>
			<div className="setting_main_wrap"></div>
		</div>

		)
	}
}
class QuestionItem extends React.PureComponent {
	constructor(props) {
		super(props)
	}
	componentDidMount() {

	}
	render() {
		let { isEditor } = this.props
		return <div className={isEditor ? "question  question_focus" : "question "}>
			<div className="q_content_wrap">
				<div className="q_content">
					<div className="q_title_wrap">
						<div className="q_seq">2</div>
						<div className="content_editable">
							<div className="q_title" >请选择以下选项 (多选)</div>
						</div>
					</div>
					<div className="q_desc_wrap none">
						<div className="content_editable">
							<div className="q_desc" ></div>
						</div>
					</div>

					<div className="q_option_list">
						<ul className="q_option_ul ui-sortable" >
							<li className="option_item" >
								<div className="option_title_wrap">
									<div className="content_editable">
										<i className="icon_operate icon_radio"></i>

										<div className="option_title" >
											<ContentEditable
												contentEditable={isEditor}
												name={"optionList"}
												html={"选项"} />
										</div>
									</div>

								</div>
							</li>
						</ul>
					</div>
					<div className="q_option_operate">
						<a className="btn_text_icon btn_add_single" >
							<i className="icon_operate icon_add"></i>添加单个选项</a>
						<a className="btn_text_icon btn_add_more" >
							<i className="icon_operate icon_add_more"></i>批量添加选项</a>
						<a className="btn_text_icon btn_add_other" >
							<i className="icon_operate icon_add_other"></i>添加「其他」项</a>
					</div>
				</div >
			</div >
			{
				isEditor ? <div className="q_operate">
					< div className="q_operate_inner" >
						<Tooltip placement="rightTop" title="编辑题目"><i className="icon_operate btn_question_edit" onClick={() => { }}></i></Tooltip>
						<Tooltip placement="rightTop" title="复制题目"><i className="icon_operate btn_question_clone" ></i></Tooltip>
						<Tooltip placement="rightTop" title="删除题目"><i className="icon_operate btn_question_dele" ></i></Tooltip>
					</div >
				</div > : null
			}
			<div className="operation_btn">
				<button class="done_btn">确定</button>
				<button class="done_btn">取消</button>
			</div>
		</div >

	}
}