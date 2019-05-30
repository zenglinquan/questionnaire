import React from 'react';
import DragSort from './components/DragSort'
import Shake from './components/Shake'
import Input from './components/Input'
import ContentEditable from './components/ContentEditable'
import { uuid } from '../../util/util'
import { Tooltip, Select } from 'antd'
const { Option } = Select;
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
					{ name: "单选题", type: "radio" }, { name: "多选题", type: "checkbox" }, { name: "图片选择", type: "image" }, { name: "下拉题", type: "select" }
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
	}

	state = {
		editorsEl: [],
		editors: [],
		isEditor: false,
		optionShake: [],
		hasOption: [],
		hasTitle: true,
		inputShake: false,
		questionnairTitle: '问卷标题',
		curMoveItem: null,
		drag: false,
		scrollTo: 0,
		newEditor: true,
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.editor.editorShake !== this.props.editor.editorShake) {
			this.setState({
				editor: {
					...this.state.editor,
					editorShake: nextProps.editor.editorShake,
				},
			});
		} else {
			this.setState({
				editor: {
					...this.state.editor,
					...nextProps.editor,
				},
			});
		};
	}

	editorsEl() {

	}

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

	createEditor(item) {
		let { type, name } = item;
		if (this.isThereEditor()) {
			return;
		}
		const editor = {
			questionId: uuid(), //id
			type: type, //类型
			name: name,
			title: '题目', //题目
			required: false, //是否必填
			remark: false, //是否有备注
			remarkText: '', //备注内容
			options: ['选项1', '选项2'], //选项(只有radio,checkbox,select有,其余尽量给个空数组)
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
			editor,
			editors: [...prevState.editors, editor],
		}));
	}

	//新增选项
	createOption = (index) => {
		let prevState = this.state
		let editor = {
			...prevState.editor,
			'options': [...prevState.editor.options, ''],
		};
		prevState.editors[index] = editor;
		this.setState(prevState => ({
			editor,
			editors: [...prevState.editors]
		}));
	}



	delOption(index) {
		let options = this.state.editor.options
		options.splice(index, 1);
		this.setState(prevState => ({
			editor: {
				...prevState.editor,
				options,
			},
		}));
	}

	handleChange(e, editorIndex, OptIndex) {
		let value = e.target ? e.target.value : e;
		let finaVal = '';
		let key = e.target.name;
		let { editor: preEditor, editors: preEditors, hasOption } = this.state;
		if (key === 'title' && value) {
			finaVal = value;
			this.setState({
				hasTitle: true,
			});
		};
		if (key == "options") {
			let {
				options
			} = preEditor;
			hasOption[OptIndex] = true;
			let optionsTemp = options.concat();
			optionsTemp[OptIndex] = value;
			finaVal = optionsTemp;
		}
		let editor = {
			...preEditor,
			hasOption: [...hasOption],
			[key]: finaVal,
		};
		console.log(editor, "e")
		preEditors[editorIndex] = editor;
		this.setState({
			editor,
			editors: [...preEditors]
		})
	}

	cancel = () => {
		let { editors: preEditors } = this.state;
		preEditors.pop();
		this.setState({
			editors: [...preEditors]
		})
	}

	ok = (index) => {
		let { editors: preEditors, editor } = this.state;
		if (!editor.title) {
			this.setState(prevState => ({
				inputShake: !prevState.inputShake,
				hasTitle: false,
			}));
			return;
		};
		let empty = editor.options.some((item, ind) => {
			if (item === '') {
				this.setState(prevState => {
					prevState.optionShake[ind] = !prevState.optionShake[ind];
					prevState.hasOption[ind] = false;
					return {
						optionShake: [...prevState.optionShake],
						hasOption: [...prevState.hasOption],
					}
				})
				return true;
			}
		})
		if (empty) return;
		preEditors[index].isEditor = false;
		preEditors[index].isFirst = false;
		this.setState({
			editors: [...preEditors],
		})

	}

	render() {
		let { questionTypes } = this
		let { editors, editor, optionShake, inputShake, hasTitle, hasOption } = this.state;
		console.log(editors)
		return (<div className="survey">
			<div className="question_type_wrap">
				{
					questionTypes.map((item, i) => {
						return <dl key={i}>
							<dt>{item.name}</dt>
							<dd className="wrap">
								{
									item.value.map((item, i) => {
										return <label key={i} onClick={this.createEditor.bind(this, item)}><i className={`icon_type icon_type_${item.type}`}></i>{item.name}</label>
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
								<QuestionItem
									key={i}
									editor={editor}
									item={item}
									index={i}
									optionShake={optionShake}
									inputShake={inputShake}
									hasTitle={hasTitle}
									hasOption={hasOption}
									createOption={this.createOption.bind(this, i)}
									delOption={this.delOption.bind(this)}
									handleChange={this.handleChange.bind(this)}
									onCancel={this.cancel.bind(this)}
									onOK={this.ok.bind(this, i)}
								></QuestionItem>
							</Shake> : <QuestionItem
								key={i}
								index={i}
								editor={editor}
								item={item}
								createOption={this.createOption.bind(this)}
								delOption={this.delOption.bind(this)}
								handleChange={this.handleChange.bind(this)}
								onCancel={this.cancel.bind(this)}
								onOK={this.ok.bind(this, i)}
							></QuestionItem>

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
		super(props);
	}
	componentDidMount() {

	}



	render() {
		let { index, editor, optionShake, inputShake, hasTitle, hasOption } = this.props
		let { isEditor, options, name, title, type } = this.props.item
		return <div className={isEditor ? "question  question_focus" : "question question_hover"}>
			<div className="q_content_wrap">
				<div className="q_content">
					<div className="q_type">{name}</div>
					<div className="q_title_wrap">
						<div className="q_seq">{index + 1}</div>
						<div className={isEditor ? "content_editable" : ""}>
							<div className="q_title" >
								{
									isEditor ? <Shake shake={inputShake}>
										<ContentEditable
											contentEditable={isEditor}
											html={title}
											index={index}
											name='title'
											style={{
												borderColor: hasTitle ? '' : "red"
											}}
											onChange={(e) => {
												this.props.handleChange(e, index)
											}}
										/>
									</Shake> : <div>{title}</div>
								}
							</div>
						</div>
					</div>
					<div className="q_desc_wrap none">
						<div className="content_editable">
							<div className="q_desc" ></div>
						</div>
					</div>

					<div className="q_option_list">
						<ul className="q_option_ul ui-sortable" >
							{
								type == "select" && !isEditor ?
									<Select defaultValue={options[0]}>
										{
											options.map((item, i) => {
												return <option key={i}>{item}</option>
											})
										}
									</Select>
									: null
							}
							{
								options.map((item, i) => {
									return <li className="option_item" key={i}>
										<div className="option_title_wrap">
											{/* <i className="icon_hover"></i> */}
											{
												isEditor ? <div className="content_editable">
													<i className={"icon_base icon_option_" + type}></i>
													<div className="option_title" >
														<Shake shake={optionShake[i]}>
															<Input
																type='text'
																index={i}
																placeholder={item}
																name='options'
																// value={item}
																maxLength={50}
																onChange={(e) => {
																	this.props.handleChange(e, index, i)
																}}
																style={{
																	borderColor: hasOption[i] === false ? 'red' : ''
																}}
															/>
														</Shake>
													</div>
													<i className="icon_operate operation_delete"
														onClick={() => {
															this.props.delOption(i)
														}}
													></i>
												</div>
													: <div>
														{
															type == "radio" || type == "checkbox" ? <div>
																<input type={type} name="options"></input>
																<span className="option_value">{item}</span>
															</div> : null
														}
													</div>
											}
										</div>
									</li>
								})
							}
						</ul>
					</div>
					{
						isEditor ? <div className="q_option_operate">
							<a className="btn_text_icon btn_add_single" onClick={this.props.createOption}>
								<i className="icon_operate icon_add"></i>添加单个选项</a>
							<a className="btn_text_icon btn_add_more" >
								<i className="icon_operate icon_add_more"></i>批量添加选项</a>
							<a className="btn_text_icon btn_add_other">
								<i className="icon_operate icon_add_other"></i>添加「其他」项</a>
						</div> : null
					}
				</div>
			</div >
			{
				!isEditor ? <div className="q_operate">
					< div className="q_operate_inner" >
						<Tooltip placement="rightTop" title="编辑题目"><i className="icon_operate btn_question_edit" onClick={() => { }}></i></Tooltip>
						<Tooltip placement="rightTop" title="复制题目"><i className="icon_operate btn_question_clone" ></i></Tooltip>
						<Tooltip placement="rightTop" title="删除题目"><i className="icon_operate btn_question_dele" ></i></Tooltip>
					</div >
				</div > : null
			}
			{
				isEditor ? <div className="operation_btn">
					<button className="done_btn" onClick={this.props.onOK}>确定</button>
					<button className="done_btn" onClick={this.props.onCancel}>取消</button>
				</div> : null
			}
		</div >

	}
}